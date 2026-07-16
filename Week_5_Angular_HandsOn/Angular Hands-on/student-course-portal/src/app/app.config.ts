import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient,
         withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth-interceptor';
import { errorHandlerInterceptor } from './interceptors/error-handler-interceptor';
import { loadingInterceptor } from './interceptors/loading-interceptor';
import { courseReducer } from './store/course/course.reducer';
import { enrollmentReducer } from './store/enrollment/enrollment.reducer';
import { CourseEffects } from './store/course/course.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

    // Register HttpClient with interceptors
    // Interceptors run in ORDER they are listed
    // Request: auth → error → loading
    // Response: loading → error → auth (reverse)
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        errorHandlerInterceptor,
        loadingInterceptor
      ])
    ),

    // Register NgRx Store
    provideStore({
      course: courseReducer,
      enrollment: enrollmentReducer
    }),

    // Register Effects
    provideEffects([CourseEffects]),

    // Redux DevTools - max 25 actions in history
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false
    })
  ]
};
