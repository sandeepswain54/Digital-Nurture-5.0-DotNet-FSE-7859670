import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { CourseService } from './course';
import { Course } from '../models/course.model';

// Mock courses data
const mockCourses: Course[] = [
  {
    id: 1,
    name: 'Data Structures',
    code: 'CS101',
    credits: 4,
    gradeStatus: 'passed',
    enrolled: true
  },
  {
    id: 2,
    name: 'Web Development',
    code: 'CS102',
    credits: 3,
    gradeStatus: 'failed',
    enrolled: false
  }
];

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // HttpClientTestingModule replaces real HTTP
      // Allows us to mock and control responses
      imports: [HttpClientTestingModule],
      providers: [CourseService]
    });

    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // After each test verify no unexpected requests
  // HttpTestingController.verify() is critical
  // It catches tests that make unintended HTTP calls
  afterEach(() => {
    httpMock.verify();
  });

  // Test 1: Service created
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test 2: getCourses success
  it('should get courses from API', () => {
    service.getCourses().subscribe(courses => {
      expect(courses.length).toBe(2);
      expect(courses[0].name)
        .toBe('Data Structures');
    });

    // expectOne asserts correct URL was called
    const req = httpMock.expectOne(
      'http://localhost:3000/courses');

    // Verify HTTP method
    expect(req.request.method).toBe('GET');

    // Flush mock response
    req.flush(mockCourses);
  });

  // Test 3: getCourseById success
  it('should get course by id', () => {
    service.getCourseById(1).subscribe(course => {
      expect(course.name).toBe('Data Structures');
      expect(course.id).toBe(1);
    });

    const req = httpMock.expectOne(
      'http://localhost:3000/courses/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses[0]);
  });

  // Test 4: Error handling
  it('should handle error when API fails', () => {
    service.getCourses().subscribe({
      next: () => {
        throw new Error('Should have failed');
      },
      error: err => {
        expect(err.message)
          .toContain('Failed to load courses');
      }
    });

    // getCourses() retries failed requests 2 times, so the
    // initial attempt plus both retries must each be flushed
    // with an error before the stream actually errors out
    for (let i = 0; i < 3; i++) {
      const req = httpMock.expectOne(
        'http://localhost:3000/courses');
      req.flush('Server error',
        { status: 500, statusText: 'Server Error' });
    }
  });

  // Test 5: createCourse POST
  it('should create a course via POST', () => {
    const newCourse = {
      name: 'New Course',
      code: 'CS999',
      credits: 3,
      gradeStatus: 'pending' as const,
      enrolled: false
    };

    service.createCourse(newCourse)
      .subscribe(course => {
        expect(course.name).toBe('New Course');
      });

    const req = httpMock.expectOne(
      'http://localhost:3000/courses');
    expect(req.request.method).toBe('POST');
    expect(req.request.body.name).toBe('New Course');
    req.flush({ id: 6, ...newCourse });
  });

  // Test 6: deleteCourse DELETE
  it('should delete a course via DELETE', () => {
    service.deleteCourse(1).subscribe(() => {
      expect(true).toBe(true);
    });

    const req = httpMock.expectOne(
      'http://localhost:3000/courses/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
