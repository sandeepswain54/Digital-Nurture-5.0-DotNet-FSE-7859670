import { createAction, props } from '@ngrx/store';
import { Course } from '../../models/course.model';

// Action type strings use [Feature] prefix convention
// Makes Redux DevTools timeline readable

// Load courses actions
export const loadCourses = createAction(
  '[Course] Load Courses'
);

export const loadCoursesSuccess = createAction(
  '[Course] Load Courses Success',
  props<{ courses: Course[] }>()
);

export const loadCoursesFailure = createAction(
  '[Course] Load Courses Failure',
  props<{ error: string }>()
);

// Add course actions
export const addCourse = createAction(
  '[Course] Add Course',
  props<{ course: Course }>()
);

// Delete course actions
export const deleteCourse = createAction(
  '[Course] Delete Course',
  props<{ id: number }>()
);
