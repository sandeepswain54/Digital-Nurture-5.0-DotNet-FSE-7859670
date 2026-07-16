import { createReducer, on } from '@ngrx/store';
import { Course } from '../../models/course.model';
import {
  loadCourses,
  loadCoursesSuccess,
  loadCoursesFailure,
  addCourse,
  deleteCourse
} from './course.actions';

// State interface
export interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

// Initial state
export const initialState: CourseState = {
  courses: [],
  loading: false,
  error: null
};

// Reducer - pure function, no side effects
export const courseReducer = createReducer(
  initialState,

  // Load courses started
  on(loadCourses, state => ({
    ...state,
    loading: true,
    error: null
  })),

  // Load courses success
  on(loadCoursesSuccess, (state, { courses }) => ({
    ...state,
    courses,
    loading: false,
    error: null
  })),

  // Load courses failure
  on(loadCoursesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Add course
  on(addCourse, (state, { course }) => ({
    ...state,
    courses: [...state.courses, course]
  })),

  // Delete course
  on(deleteCourse, (state, { id }) => ({
    ...state,
    courses: state.courses.filter(c => c.id !== id)
  }))
);
