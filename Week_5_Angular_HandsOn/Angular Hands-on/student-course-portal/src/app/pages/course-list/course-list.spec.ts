import { ComponentFixture, TestBed } from
  '@angular/core/testing';
import { RouterTestingModule } from
  '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore, MockStore } from
  '@ngrx/store/testing';
import { CourseList } from './course-list';
import { Course } from '../../models/course.model';

// Mock courses
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

// Initial state for MockStore
const initialState = {
  course: {
    courses: mockCourses,
    loading: false,
    error: null
  },
  enrollment: {
    enrolledCourseIds: [1]
  }
};

describe('CourseList', () => {
  let component: CourseList;
  let fixture: ComponentFixture<CourseList>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CourseList,
        RouterTestingModule
      ],
      providers: [
        // MockStore from @ngrx/store/testing
        // Replaces real store with controllable mock
        provideMockStore({ initialState })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseList);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  // Test 1: Component created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test 2: Courses from initial state
  it('should display courses from store', () => {
    fixture.detectChanges();

    const cards = fixture.debugElement
      .queryAll(By.css('app-course-card'));

    expect(cards.length).toBe(2);
  });

  // Test 3: Loading state
  it('should show loading when loading is true',
    () => {
    // Use setState to simulate loading state
    // MockStore.setState allows controlling state
    store.setState({
      course: {
        courses: [],
        loading: true,
        error: null
      },
      enrollment: {
        enrolledCourseIds: []
      }
    });
    fixture.detectChanges();

    const loading = fixture.debugElement
      .query(By.css('.loading'));

    expect(loading).toBeTruthy();
    expect(loading.nativeElement.textContent)
      .toContain('Loading');
  });

  // Test 4: Error state
  it('should show error message when error occurs',
    () => {
    store.setState({
      course: {
        courses: [],
        loading: false,
        error: 'Failed to load courses'
      },
      enrollment: {
        enrolledCourseIds: []
      }
    });
    fixture.detectChanges();

    const error = fixture.debugElement
      .query(By.css('.error-message'));

    expect(error).toBeTruthy();
    expect(error.nativeElement.textContent)
      .toContain('Failed to load courses');
  });

  // Test 5: Empty courses
  it('should show no courses message when empty',
    () => {
    store.setState({
      course: {
        courses: [],
        loading: false,
        error: null
      },
      enrollment: {
        enrolledCourseIds: []
      }
    });
    fixture.detectChanges();

    const noCourses = fixture.debugElement
      .query(By.css('.no-courses'));

    expect(noCourses).toBeTruthy();
  });

  // Test 6: trackByCourseId
  it('should return course id for trackBy', () => {
    const result = component.trackByCourseId(
      0, mockCourses[0]);
    expect(result).toBe(1);
  });

  // Test 7: onEnroll sets selectedCourseId
  it('should set selectedCourseId on enroll', () => {
    component.onEnroll(5);
    expect(component.selectedCourseId).toBe(5);
  });
});
