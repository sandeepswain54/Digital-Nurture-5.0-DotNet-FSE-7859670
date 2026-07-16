import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { EnrollmentService } from './enrollment';
import { CourseService } from './course';

describe('EnrollmentService', () => {
  let service: EnrollmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EnrollmentService, CourseService]
    });
    service = TestBed.inject(EnrollmentService);
  });

  // Test 1: Service created
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test 2: Enroll in course
  it('should enroll in a course', () => {
    service.enroll(5);
    expect(service.isEnrolled(5)).toBe(true);
  });

  // Test 3: Unenroll from course
  it('should unenroll from a course', () => {
    service.enroll(5);
    service.unenroll(5);
    expect(service.isEnrolled(5)).toBe(false);
  });

  // Test 4: isEnrolled returns false
  it('should return false for not enrolled', () => {
    expect(service.isEnrolled(99)).toBe(false);
  });

  // Test 5: No duplicate enrollment
  it('should not enroll same course twice', () => {
    service.enroll(5);
    service.enroll(5);
    const count = service.getEnrolledCount();
    // 1, 3 are default + 5 = 3
    expect(count).toBe(3);
  });
});
