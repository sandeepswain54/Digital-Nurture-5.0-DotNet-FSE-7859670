# Student Course Portal

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

## Screenshots

### HandsOn1
![HandsOn1](../../Output/HandsOn1/Screenshot%202026-07-16%20142926.png)

### HandsOn2
![HandsOn2](../../Output/HandsOn2/Screenshot%202026-07-16%20143644.png)

### HandsOn3
![HandsOn3](../../Output/HandsOn3/Screenshot%202026-07-16%20143657.png)

### HandsOn4
![HandsOn4](../../Output/HandsOn4/Screenshot%202026-07-16%20144614.png)

### HandsOn5
![HandsOn5](../../Output/HandsOn5/Screenshot%202026-07-16%20145040.png)

### HandsOn6
![HandsOn6](../../Output/HandsOn6/Screenshot%202026-07-16%20145419.png)

### HandsOn7
![HandsOn7](../../Output/HandsOn7/Screenshot%202026-07-16%20145855.png)

### HandsOn8
![HandsOn8](../../Output/HandsOn8/Screenshot%202026-07-16%20150416.png)
![HandsOn8](../../Output/HandsOn8/Screenshot%202026-07-16%20150422.png)
![HandsOn8](../../Output/HandsOn8/Screenshot%202026-07-16%20153041.png)

### HandsOn9
![HandsOn9](../../Output/HandsOn9/Screenshot%202026-07-16%20153044.png)

### HandsOn10
![HandsOn10](../../Output/HandsOn10/Screenshot%202026-07-16%20155310.png)
![HandsOn10](../../Output/HandsOn10/Screenshot%202026-07-16%20155531.png)
![HandsOn10](../../Output/HandsOn10/Screenshot%202026-07-16%20155537.png)
![HandsOn10](../../Output/HandsOn10/Screenshot%202026-07-16%20155542.png)
![HandsOn10](../../Output/HandsOn10/Screenshot%202026-07-16%20155547.png)
![HandsOn10](../../Output/HandsOn10/Screenshot%202026-07-16%20155552.png)
![HandsOn10](../../Output/HandsOn10/Screenshot%202026-07-16%20155601.png)

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
