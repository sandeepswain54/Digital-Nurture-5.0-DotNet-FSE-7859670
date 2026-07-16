import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Course } from '../../models/course.model';
import { selectAllCourses, selectCoursesCount } from '../../store/course/course.selectors';
import { selectEnrolledCount, selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';
import { loadCourses } from '../../store/course/course.actions';
import { enrollInCourse } from '../../store/enrollment/enrollment.actions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy {

  portalName = 'Student Course Portal';
  isPortalActive = true;
  message = '';
  searchTerm = '';
  showDropdown = false;
  gpa = 3.8;

  // Observables from store
  coursesCount$: Observable<number>;
  enrolledCount$: Observable<number>;
  courses$: Observable<Course[]>;

  // Toast
  toastMessage: string | null = null;
  private toastTimeoutId?: ReturnType<typeof setTimeout>;

  // Local snapshots kept in sync with the store so the dropdown
  // can check enrollment status synchronously
  private enrolledIds: number[] = [];
  private enrolledIdsSub?: Subscription;

  constructor(
    private store: Store,
    private router: Router
  ) {
    this.coursesCount$ =
      this.store.select(selectCoursesCount);
    this.enrolledCount$ =
      this.store.select(selectEnrolledCount);
    this.courses$ =
      this.store.select(selectAllCourses);
  }

  ngOnInit() {
    this.store.dispatch(loadCourses());
    console.log('HomeComponent initialised');

    this.enrolledIdsSub = this.store
      .select(selectEnrolledIds)
      .subscribe(ids => this.enrolledIds = ids);
  }

  ngOnDestroy() {
    this.enrolledIdsSub?.unsubscribe();
    if (this.toastTimeoutId) {
      clearTimeout(this.toastTimeoutId);
    }
  }

  onEnrollClick() {
    this.message = 'Enrollment opened!';
  }

  // Filter courses by name or code for the search dropdown
  filterCourses(courses: Course[]): Course[] {
    if (!this.searchTerm) {
      return courses;
    }
    const term = this.searchTerm.toLowerCase();
    return courses.filter(c =>
      c.name.toLowerCase().includes(term) ||
      c.code.toLowerCase().includes(term)
    );
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledIds.includes(courseId);
  }

  onSearchFocus() {
    this.showDropdown = true;
  }

  onSearchBlur() {
    // Small delay so a dropdown item click registers
    // before the dropdown closes
    setTimeout(() => this.showDropdown = false, 150);
  }

  // Enroll straight from the search dropdown - only ever
  // enrolls, never unenrolls, and only for courses not already
  // enrolled, so you can't accidentally unenroll from here
  quickEnroll(course: Course) {
    if (this.isEnrolled(course.id)) {
      return;
    }
    this.store.dispatch(
      enrollInCourse({ courseId: course.id }));
    this.showToast(`Enrolled in ${course.name}!`);
  }

  // Clicking a course name in the dropdown goes to its detail page
  goToCourse(courseId: number) {
    this.showDropdown = false;
    this.router.navigate(['courses', courseId]);
  }

  private showToast(message: string) {
    this.toastMessage = message;
    if (this.toastTimeoutId) {
      clearTimeout(this.toastTimeoutId);
    }
    this.toastTimeoutId = setTimeout(() => {
      this.toastMessage = null;
    }, 3000);
  }
}
