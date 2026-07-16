import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Course } from '../models/course.model';
import { CourseService } from './course';

// Singleton service - one instance for whole app
@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  // Store enrolled course IDs
  private enrolledCourseIds: number[] = [1, 3];

  // Emails already used to submit the enrollment form -
  // prevents two different submissions with the same email
  private enrolledEmails = new Set<string>();

  // Service-to-service injection
  // CourseService injected into EnrollmentService
  constructor(private courseService: CourseService) {}

  // Enroll in a course
  enroll(courseId: number): void {
    if (!this.isEnrolled(courseId)) {
      this.enrolledCourseIds.push(courseId);
      console.log('Enrolled in course:', courseId);
    }
  }

  // Unenroll from a course
  unenroll(courseId: number): void {
    this.enrolledCourseIds =
      this.enrolledCourseIds.filter(id => id !== courseId);
    console.log('Unenrolled from course:', courseId);
  }

  // Check if enrolled
  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  // Get all enrolled courses
  // CourseService.getCourseById is now HTTP-based, so resolve
  // all enrolled IDs in parallel and filter out any that failed
  getEnrolledCourses(): Observable<Course[]> {
    if (this.enrolledCourseIds.length === 0) {
      return of([]);
    }
    return forkJoin(
      this.enrolledCourseIds.map(id =>
        this.courseService.getCourseById(id).pipe(
          catchError(() => of(undefined))
        )
      )
    ).pipe(
      map(courses =>
        courses.filter((c): c is Course => c !== undefined))
    );
  }

  // Get enrolled count
  getEnrolledCount(): number {
    return this.enrolledCourseIds.length;
  }

  // Check if an email has already been used to enroll
  isEmailTaken(email: string): boolean {
    return this.enrolledEmails.has(email.trim().toLowerCase());
  }

  // Record an email as having enrolled
  registerEmail(email: string): void {
    this.enrolledEmails.add(email.trim().toLowerCase());
  }
}
