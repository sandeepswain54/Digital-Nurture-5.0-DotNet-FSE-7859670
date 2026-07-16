import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CourseList } from './pages/course-list/course-list';
import { StudentProfile } from './pages/student-profile/student-profile';
import { EnrollmentForm } from './pages/enrollment-form/enrollment-form';
import { ReactiveEnrollmentForm } from './pages/reactive-enrollment-form/reactive-enrollment-form';
import { CourseDetail } from './pages/course-detail/course-detail';
import { NotFound } from './pages/not-found/not-found';
import { authGuard } from './guards/auth-guard';
import { unsavedChangesGuard } from './guards/unsaved-changes-guard';

export const routes: Routes = [
  // Home route
  { path: '', component: Home },

  // Courses routes
  { path: 'courses', component: CourseList },

  // Course detail with route parameter :id
  { path: 'courses/:id', component: CourseDetail },

  // Protected routes with auth guard
  {
    path: 'profile',
    component: StudentProfile,
    canActivate: [authGuard]
  },

  // Enrollment routes
  { path: 'enroll', component: EnrollmentForm },
  {
    path: 'enroll-reactive',
    component: ReactiveEnrollmentForm,
    canDeactivate: [unsavedChangesGuard]
  },

  // Wildcard route - must be LAST
  // ** catches all unknown routes
  { path: '**', component: NotFound }
];
