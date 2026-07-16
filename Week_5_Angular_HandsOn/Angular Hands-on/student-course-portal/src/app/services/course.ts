import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap, retry } from 'rxjs/operators';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl = 'http://localhost:3000/courses';

  // Inject HttpClient
  constructor(private http: HttpClient) {}

  // GET all courses
  // Returns Observable - lazy, only executes on subscribe
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      // tap: side effects without changing stream
      // Never modify data inside tap - use map for that
      tap(courses =>
        console.log('Courses loaded:', courses.length)),

      // map: transform/filter data
      // json-server returns id as a string - coerce back to
      // number so it matches the Course interface
      map(courses =>
        courses
          .map(c => ({ ...c, id: Number(c.id) }))
          .filter(c => c.credits > 0)),

      // retry: retry failed requests 2 times
      retry(2),

      // catchError: handle errors gracefully
      catchError(err => {
        console.error('Error loading courses:', err);
        return throwError(() =>
          new Error('Failed to load courses. Please try again.'));
      })
    );
  }

  // GET course by ID
  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`)
      .pipe(
        // json-server returns id as a string - coerce back
        // to number so it matches the Course interface
        map(c => ({ ...c, id: Number(c.id) })),
        catchError(err => {
          console.error('Error loading course:', err);
          return throwError(() =>
            new Error('Course not found'));
        })
      );
  }

  // POST - Create new course
  createCourse(
    course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course)
      .pipe(
        tap(c => console.log('Course created:', c)),
        catchError(err => throwError(() =>
          new Error('Failed to create course')))
      );
  }

  // PUT - Update course
  updateCourse(
    id: number, course: Course): Observable<Course> {
    return this.http.put<Course>(
      `${this.apiUrl}/${id}`, course)
      .pipe(
        tap(c => console.log('Course updated:', c)),
        catchError(err => throwError(() =>
          new Error('Failed to update course')))
      );
  }

  // DELETE - Delete course
  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`)
      .pipe(
        tap(() => console.log('Course deleted:', id)),
        catchError(err => throwError(() =>
          new Error('Failed to delete course')))
      );
  }

  // Keep these for backward compatibility
  getCoursesCount(): number { return 5; }
}
