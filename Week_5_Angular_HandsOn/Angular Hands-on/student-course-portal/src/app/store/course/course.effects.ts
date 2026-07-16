import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from
  '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from
  'rxjs/operators';
import { CourseService } from '../../services/course';
import {
  loadCourses,
  loadCoursesSuccess,
  loadCoursesFailure
} from './course.actions';

// Effects handle async operations
// Effects are the ONLY place for side effects in NgRx
// Reducers must remain pure functions
@Injectable()
export class CourseEffects {

  // Declared before loadCourses$ so these are assigned
  // first - field initializers run in declaration order
  private actions$ = inject(Actions);
  private courseService = inject(CourseService);

  // Load courses effect
  // Flow: dispatch loadCourses action
  //    → Effect fires HTTP call
  //    → dispatch loadCoursesSuccess or Failure
  //    → Reducer updates state
  //    → Selector emits new value
  //    → Component re-renders
  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCourses),

      // switchMap cancels previous request
      // when new one arrives
      // Essential for preventing race conditions
      switchMap(() =>
        this.courseService.getCourses().pipe(
          map(courses =>
            loadCoursesSuccess({ courses })),
          catchError(error =>
            of(loadCoursesFailure({
              error: error.message
            })))
        )
      )
    )
  );
}
