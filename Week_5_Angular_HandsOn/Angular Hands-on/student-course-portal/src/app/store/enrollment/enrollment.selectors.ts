import { createFeatureSelector,
         createSelector } from '@ngrx/store';
import { EnrollmentState } from
  './enrollment.reducer';
import { selectAllCourses } from
  '../course/course.selectors';

export const selectEnrollmentState =
  createFeatureSelector<EnrollmentState>('enrollment');

// Select enrolled IDs
export const selectEnrolledIds = createSelector(
  selectEnrollmentState,
  state => state.enrolledCourseIds
);

// Cross-slice selector
// Combines course and enrollment state
// to get full course objects for enrolled IDs
export const selectEnrolledCourses = createSelector(
  selectAllCourses,
  selectEnrolledIds,
  (courses, enrolledIds) =>
    courses.filter(c => enrolledIds.includes(c.id))
);

// Select enrolled count
export const selectEnrolledCount = createSelector(
  selectEnrolledIds,
  ids => ids.length
);
