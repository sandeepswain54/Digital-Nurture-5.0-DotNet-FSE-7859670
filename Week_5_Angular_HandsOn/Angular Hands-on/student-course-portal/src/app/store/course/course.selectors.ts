import { createFeatureSelector,
         createSelector } from '@ngrx/store';
import { CourseState } from './course.reducer';

// Feature selector for course state
export const selectCourseState =
  createFeatureSelector<CourseState>('course');

// Selectors are memoised
// Only recompute when input selectors change
// This is NgRx key performance optimisation

// Select all courses
export const selectAllCourses = createSelector(
  selectCourseState,
  state => state.courses
);

// Select loading state
export const selectCoursesLoading = createSelector(
  selectCourseState,
  state => state.loading
);

// Select error state
export const selectCoursesError = createSelector(
  selectCourseState,
  state => state.error
);

// Select courses count
export const selectCoursesCount = createSelector(
  selectAllCourses,
  courses => courses.length
);
