# Student Course Portal

## Screenshots — Step by Step

### 1. Home page
Run `ng serve`, then open **http://localhost:4200**.
![Home page](../../Output/HandsOn1/Screenshot%202026-07-16%20142926.png)

### 2. Home page — live search binding
Same page — type into the "Search courses..." box under **Enroll Now** to see the two-way `[(ngModel)]` binding echo back what you type.
![Home page search binding](../../Output/HandsOn2/Screenshot%202026-07-16%20143644.png)

### 3. Courses page
Click **Courses** in the nav bar (or go to **http://localhost:4200/courses**) to see the course grid with Enroll buttons.
![Courses grid](../../Output/HandsOn3/Screenshot%202026-07-16%20143657.png)

### 4. Courses page — grade status badges
Same page — each card is colour-coded and badged by grade status (✅ Passed / ❌ Failed / ⏳ Pending); clicking **Enroll** shows the selected course ID at the bottom.
![Courses with status badges](../../Output/HandsOn4/Screenshot%202026-07-16%20144614.png)

### 5. Enrollment form (template-driven)
Click **Enroll** in the nav bar (or go to **http://localhost:4200/enroll**) to fill out the template-driven form with live field validation.
![Template-driven enrollment form](../../Output/HandsOn5/Screenshot%202026-07-16%20145040.png)

### 6. Reactive enrollment form
Click **Reactive Form** in the nav bar (or go to **http://localhost:4200/enroll-reactive**) for the reactive form with custom validators and a dynamic "Additional Courses" list.
![Reactive enrollment form](../../Output/HandsOn6/Screenshot%202026-07-16%20145419.png)

### 7. Student profile
Click **Profile** in the nav bar (or go to **http://localhost:4200/profile**) to see the enrolled-courses list.
![Student profile page](../../Output/HandsOn7/Screenshot%202026-07-16%20145855.png)

### 8. Enroll/Unenroll + course detail + the mock API
This step needs **both servers running**:
```bash
# Terminal 1
npx json-server db.json --port 3000
# Terminal 2
ng serve
```
Enrolled courses now show a red **Unenroll** button; clicking a card opens its detail page (`/courses/:id`); the raw data behind it is visible directly at `http://localhost:3000/courses`.
![Courses page with Unenroll buttons](../../Output/HandsOn8/Screenshot%202026-07-16%20150416.png)
![Course detail page](../../Output/HandsOn8/Screenshot%202026-07-16%20150422.png)
![json-server /courses endpoint](../../Output/HandsOn8/Screenshot%202026-07-16%20153041.png)

### 9. Courses page powered by the NgRx store
Same Courses page as before, now reading `courses$` / `enrolledIds$` from the NgRx store instead of calling the service directly — visually the same, driven the same way (`ng serve` + `json-server`).
![Courses page backed by NgRx](../../Output/HandsOn9/Screenshot%202026-07-16%20153044.png)

### 10. Unit tests
Run:
```bash
ng test
```
This opens the Vitest test runner and executes every `*.spec.ts` file — services, components, guards, interceptors, pipes, and directives.
![Test run](../../Output/HandsOn10/Screenshot%202026-07-16%20155310.png)
![Test run](../../Output/HandsOn10/Screenshot%202026-07-16%20155531.png)
![Test run](../../Output/HandsOn10/Screenshot%202026-07-16%20155537.png)
![Test run](../../Output/HandsOn10/Screenshot%202026-07-16%20155542.png)
![Test run](../../Output/HandsOn10/Screenshot%202026-07-16%20155547.png)
![Test run](../../Output/HandsOn10/Screenshot%202026-07-16%20155552.png)
![All 42 tests passed](../../Output/HandsOn10/Screenshot%202026-07-16%20155601.png)

---

An Angular Web app for browsing courses, enrolling/unenrolling, and managing a student profile. Built with standalone components, Angular Router, Reactive & Template-driven Forms, NgRx (Store + Effects), HttpClient with interceptors, and a `json-server` mock backend.

## Tech Stack

- **Angular 21** (standalone components, `@angular/build` application builder, Vitest-based unit tests)
- **NgRx** — `@ngrx/store`, `@ngrx/effects`, `@ngrx/store-devtools`
- **json-server** — mock REST API for courses/students/enrollments
- **RxJS**

## Prerequisites

- Node.js and npm installed
- (Optional but recommended) [Redux DevTools browser extension](https://chrome.google.com/webstore/detail/redux-devtools) to inspect the NgRx store while the app runs

## Setup

Install dependencies once:

```bash
npm install
```

## Running the App

This app needs **two servers running at the same time** — the mock API and the Angular dev server.

**Terminal 1 — mock API (json-server), port 3000:**

```bash
npx json-server db.json --port 3000
```

This serves `db.json` at:
- `http://localhost:3000/courses`
- `http://localhost:3000/students`
- `http://localhost:3000/enrollments`

**Terminal 2 — Angular dev server, port 4200:**

```bash
ng serve
```

Then open **http://localhost:4200** in your browser. The app hot-reloads on source changes.

> If `ng serve` fails with "Port 4200 is already in use," a dev server is likely already running from an earlier session — just open `http://localhost:4200` directly instead of starting a new one.

## Available Routes

| Route              | Page                                          | Notes                        |
|--------------------|------------------------------------------------|-------------------------------|
| `/`                | Home — live stats, search + quick-enroll        |                                |
| `/courses`         | Course list — search, filter, enroll/unenroll   |                                |
| `/courses/:id`     | Course detail                                    |                                |
| `/enroll`          | Enrollment form (template-driven)               |                                |
| `/enroll-reactive` | Enrollment form (reactive, with validators)     | Guarded by `unsavedChangesGuard` |
| `/profile`         | Student profile — enrolled courses               | Guarded by `authGuard`        |
| `**`               | 404 Not Found                                    |                                |

## Project Structure

```
student-course-portal/
├── db.json                        # Mock data for json-server (courses, students, enrollments)
├── angular.json                   # Angular CLI workspace config
├── package.json
└── src/
    └── app/
        ├── app.ts / app.html / app.css     # Root component (header + router-outlet + global spinner)
        ├── app.config.ts                   # App-wide providers: router, HttpClient + interceptors, NgRx store/effects/devtools
        ├── app.routes.ts                   # Route definitions + guards
        │
        ├── components/                     # Reusable, presentational components
        │   ├── header/                     # Top nav bar
        │   └── course-card/                # Single course card (used in list + search results)
        │
        ├── pages/                          # Routed page components
        │   ├── home/                       # Landing page, live stats, search dropdown
        │   ├── course-list/                # Course grid, search, filtering
        │   ├── course-detail/              # Single course detail page (:id route param)
        │   ├── student-profile/            # Enrolled courses for the student
        │   ├── enrollment-form/            # Template-driven enrollment form
        │   ├── reactive-enrollment-form/   # Reactive enrollment form with custom validators
        │   └── not-found/                  # 404 page
        │
        ├── services/                       # Injectable app services
        │   ├── course.ts                   # CourseService — HTTP calls to json-server /courses
        │   ├── enrollment.ts               # EnrollmentService — enroll/unenroll, duplicate-email check
        │   └── loading.ts                  # LoadingService — drives the global spinner
        │
        ├── store/                          # NgRx state management
        │   ├── course/                     # Course actions, reducer, selectors, effects (HTTP via CourseService)
        │   └── enrollment/                 # Enrollment actions, reducer, selectors
        │
        ├── guards/                         # Route guards
        │   ├── auth-guard.ts               # CanActivate — protects /profile
        │   └── unsaved-changes-guard.ts    # CanDeactivate — warns before leaving a dirty reactive form
        │
        ├── interceptors/                   # HttpClient interceptors
        │   ├── auth-interceptor.ts         # Attaches a bearer token to outgoing requests
        │   ├── error-handler-interceptor.ts# Centralised HTTP error handling
        │   └── loading-interceptor.ts      # Shows/hides the global spinner around HTTP calls
        │
        ├── directives/
        │   └── highlight.ts                # appHighlight — highlights an element on hover
        │
        ├── pipes/
        │   ├── credit-label-pipe.ts        # Formats course credits (e.g. "3 Credits")
        │   └── as-form-control-pipe.ts     # Casts AbstractControl to FormControl for reactive FormArray templates
        │
        └── models/
            └── course.model.ts             # Course interface
```

## Other Useful Commands

```bash
# Production build (outputs to dist/)
ng build

# Run unit tests (Vitest)
ng test

# Run unit tests with coverage report
ng test --coverage
# Report: coverage/student-course-portal/index.html
```
