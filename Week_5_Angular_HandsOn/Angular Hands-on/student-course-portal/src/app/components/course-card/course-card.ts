import { Component, Input, Output,
         EventEmitter, OnChanges,
         SimpleChanges } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Highlight } from '../../directives/highlight';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
import { Course } from '../../models/course.model';
import {
  enrollInCourse,
  unenrollFromCourse
} from '../../store/enrollment/enrollment.actions';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, Highlight,
            CreditLabelPipe, AsyncPipe],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css'
})
export class CourseCard implements OnChanges {

  @Input() course: Course = {
    id: 0,
    name: '',
    code: '',
    credits: 0,
    gradeStatus: 'pending',
    enrolled: false
  };

  @Output() enrollRequested =
    new EventEmitter<number>();

  isExpanded = false;

  // Observable for enrolled state
  // Wrapped in an object (not a bare boolean) because the
  // template uses "isEnrolled$ | async as state" - *ngIf
  // hides content when the piped value is falsy, and a bare
  // `false` would hide the whole card for non-enrolled courses
  isEnrolled$: Observable<{ enrolled: boolean }>;

  constructor(private store: Store) {
    this.isEnrolled$ = this.store
      .select(selectEnrolledIds)
      .pipe(
        map(ids => ({ enrolled: ids.includes(this.course.id) }))
      );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['course']) {
      // Update isEnrolled$ when course changes
      this.isEnrolled$ = this.store
        .select(selectEnrolledIds)
        .pipe(
          map(ids => ({ enrolled: ids.includes(this.course.id) }))
        );
    }
  }

  // Dispatch enroll/unenroll action to store
  onEnroll(isEnrolled: boolean) {
    if (isEnrolled) {
      this.store.dispatch(
        unenrollFromCourse({
          courseId: this.course.id
        })
      );
    } else {
      this.store.dispatch(
        enrollInCourse({
          courseId: this.course.id
        })
      );
    }
    this.enrollRequested.emit(this.course.id);
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  getCardClasses(isEnrolled: boolean) {
    return {
      'card--enrolled': isEnrolled,
      'card--full': this.course.credits >= 4,
      'expanded': this.isExpanded
    };
  }
}
