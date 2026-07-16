import { Component, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CourseCard } from '../../components/course-card/course-card';
import { Course } from '../../models/course.model';
import { loadCourses } from '../../store/course/course.actions';
import {
  selectAllCourses,
  selectCoursesLoading,
  selectCoursesError
} from '../../store/course/course.selectors';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, CourseCard, AsyncPipe],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList implements OnInit {

  // Observables from NgRx store
  courses$: Observable<Course[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;

  selectedCourseId: number | null = null;

  constructor(
    private store: Store,
    private router: Router
  ) {
    // Select from store using selectors
    this.courses$ =
      this.store.select(selectAllCourses);
    this.isLoading$ =
      this.store.select(selectCoursesLoading);
    this.error$ =
      this.store.select(selectCoursesError);
  }

  ngOnInit() {
    // Dispatch action to load courses
    // Effect handles the HTTP call
    this.store.dispatch(loadCourses());
    console.log('Dispatched loadCourses action');
  }

  trackByCourseId(
    index: number, course: Course): number {
    return course.id;
  }

  onEnroll(courseId: number) {
    this.selectedCourseId = courseId;
  }

  onCardClick(courseId: number) {
    this.router.navigate(['courses', courseId]);
  }
}
