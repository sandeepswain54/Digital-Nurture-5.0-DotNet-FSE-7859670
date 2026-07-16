import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCoursesCount } from '../../store/course/course.selectors';
import { selectEnrolledCount } from '../../store/enrollment/enrollment.selectors';
import { loadCourses } from '../../store/course/course.actions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  portalName = 'Student Course Portal';
  isPortalActive = true;
  message = '';
  searchTerm = '';
  gpa = 3.8;

  // Observables from store
  coursesCount$: Observable<number>;
  enrolledCount$: Observable<number>;

  constructor(private store: Store) {
    this.coursesCount$ =
      this.store.select(selectCoursesCount);
    this.enrolledCount$ =
      this.store.select(selectEnrolledCount);
  }

  ngOnInit() {
    this.store.dispatch(loadCourses());
    console.log('HomeComponent initialised');
  }

  onEnrollClick() {
    this.message = 'Enrollment opened!';
  }
}
