import { Component } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from '../../models/course.model';
import { selectEnrolledCourses } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css'
})
export class StudentProfile {

  // Observable from NgRx store
  enrolledCourses$: Observable<Course[]>;

  constructor(private store: Store) {
    this.enrolledCourses$ =
      this.store.select(selectEnrolledCourses);
  }
}
