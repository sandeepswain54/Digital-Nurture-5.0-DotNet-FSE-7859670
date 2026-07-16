import { ComponentFixture, TestBed } from
  '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SimpleChanges, SimpleChange } from
  '@angular/core';
import { provideMockStore, MockStore } from
  '@ngrx/store/testing';
import { CourseCard } from './course-card';
import { Course } from '../../models/course.model';

// Mock course data for testing
const mockCourse: Course = {
  id: 1,
  name: 'Data Structures',
  code: 'CS101',
  credits: 4,
  gradeStatus: 'passed',
  enrolled: true
};

// Initial NgRx state for testing
const initialState = {
  enrollment: {
    enrolledCourseIds: [1, 3]
  }
};

describe('CourseCard', () => {
  let component: CourseCard;
  let fixture: ComponentFixture<CourseCard>;
  let store: MockStore;

  // Test 1: Setup TestBed
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCard],
      providers: [
        // MockStore replaces real NgRx store
        // Allows controlling state in tests
        provideMockStore({ initialState })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCard);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    // Set input before detectChanges
    component.course = mockCourse;
    fixture.detectChanges();
  });

  // Test 2: Component created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test 3: @Input rendering
  it('should display course name', () => {
    // fixture.detectChanges triggers change detection
    // Always call after changing component properties
    component.course = mockCourse;
    fixture.detectChanges();

    // By.css is Angular way to query DOM in tests
    const h3 = fixture.debugElement
      .query(By.css('h3'));

    expect(h3).toBeTruthy();
    expect(h3.nativeElement.textContent)
      .toContain('Data Structures');
  });

  // Test 4: @Input with credits
  it('should display course code', () => {
    component.course = mockCourse;
    fixture.detectChanges();

    const codeEl = fixture.debugElement
      .query(By.css('.code'));

    expect(codeEl.nativeElement.textContent)
      .toContain('CS101');
  });

  // Test 5: @Output event
  it('should emit enrollRequested on enroll click',
    () => {
    component.course = mockCourse;
    fixture.detectChanges();

    // Spy on EventEmitter
    vi.spyOn(component.enrollRequested, 'emit');

    // Find and click enroll button
    const btn = fixture.debugElement
      .query(By.css('.enroll-btn'));
    btn.nativeElement.click();
    fixture.detectChanges();

    // Verify emit was called with course id
    expect(component.enrollRequested.emit)
      .toHaveBeenCalledWith(1);
  });

  // Test 6: ngOnChanges
  // ngOnChanges no longer logs - it re-derives isEnrolled$
  // from the store based on the new course id, so verify
  // that instead
  it('should update isEnrolled$ when course input changes',
    () => {
    const otherCourse: Course = { ...mockCourse, id: 2 };
    component.course = otherCourse;

    const changes: SimpleChanges = {
      course: new SimpleChange(
        mockCourse, otherCourse, false)
    };
    component.ngOnChanges(changes);

    let result: boolean | undefined;
    component.isEnrolled$.subscribe(v => result = v);

    // id 2 is not in the mock enrolledCourseIds [1, 3]
    expect(result).toBe(false);
  });

  // Test 7: Toggle expand
  it('should toggle expanded state', () => {
    expect(component.isExpanded).toBe(false);

    component.toggleExpand();
    expect(component.isExpanded).toBe(true);

    component.toggleExpand();
    expect(component.isExpanded).toBe(false);
  });

  // Test 8: Card classes
  it('should return correct card classes', () => {
    const classes = component.getCardClasses(true);
    expect(classes['card--enrolled']).toBe(true);
    expect(classes['card--full']).toBe(true);
  });
});
