import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { CourseCard } from '../../components/course-card/course-card';
import { Course } from '../../models/course.model';
import { loadCourses } from '../../store/course/course.actions';
import {
  selectAllCourses,
  selectCoursesLoading,
  selectCoursesError
} from '../../store/course/course.selectors';
import { enrollInCourse } from '../../store/enrollment/enrollment.actions';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, CourseCard, AsyncPipe, FormsModule],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList implements OnInit, OnDestroy {

  // Observables from NgRx store
  courses$: Observable<Course[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;

  selectedCourseId: number | null = null;

  // Search
  searchTerm = '';
  showDropdown = false;

  // Toast
  toastMessage: string | null = null;
  private toastTimeoutId?: ReturnType<typeof setTimeout>;

  // Local snapshots kept in sync with the store so methods
  // (dropdown enroll, toast lookup) can read them synchronously
  // instead of needing another async pipe
  private allCourses: Course[] = [];
  private enrolledIds: number[] = [];
  private coursesSub?: Subscription;
  private enrolledIdsSub?: Subscription;

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

    this.coursesSub = this.courses$.subscribe(
      courses => this.allCourses = courses);
    this.enrolledIdsSub = this.store
      .select(selectEnrolledIds)
      .subscribe(ids => this.enrolledIds = ids);
  }

  ngOnDestroy() {
    this.coursesSub?.unsubscribe();
    this.enrolledIdsSub?.unsubscribe();
    if (this.toastTimeoutId) {
      clearTimeout(this.toastTimeoutId);
    }
  }

  // courses$ is an Observable, so filtering happens here on
  // the array the async pipe has already resolved in the
  // template, rather than on a synchronous `courses` field
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

  trackByCourseId(
    index: number, course: Course): number {
    return course.id;
  }

  onSearchFocus() {
    this.showDropdown = true;
  }

  onSearchBlur() {
    // Small delay so a dropdown item click registers
    // before the dropdown closes
    setTimeout(() => this.showDropdown = false, 150);
  }

  // Enroll straight from the search dropdown.
  // Only ever enrolls - never toggles to unenroll - and only
  // applies to courses that aren't already enrolled, so you
  // can't accidentally unenroll from the dropdown
  quickEnroll(course: Course) {
    if (this.isEnrolled(course.id)) {
      return;
    }
    this.store.dispatch(
      enrollInCourse({ courseId: course.id }));
    this.showToast(`Enrolled in ${course.name}!`);
  }

  // Handles the (enrollRequested) event from app-course-card.
  // The card already dispatched enroll/unenroll before emitting,
  // so by now the store reflects the new state - only show the
  // toast when the course just became enrolled
  onEnroll(courseId: number) {
    this.selectedCourseId = courseId;
    if (this.isEnrolled(courseId)) {
      const course = this.allCourses.find(c => c.id === courseId);
      if (course) {
        this.showToast(`Enrolled in ${course.name}!`);
      }
    }
  }

  onCardClick(courseId: number) {
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
