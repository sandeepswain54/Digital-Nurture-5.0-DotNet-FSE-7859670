import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

// Global error handler interceptor
export const errorHandlerInterceptor: HttpInterceptorFn =
  (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError(error => {
      console.error('HTTP Error:', error.status);

      if (error.status === 401) {
        // Unauthorized - navigate to home
        console.log('Unauthorized! Redirecting...');
        router.navigate(['/']);
      }

      if (error.status === 500) {
        // Server error - show notification
        console.error('Server error occurred!');
      }

      if (error.status === 404) {
        console.error('Resource not found!');
      }

      return throwError(() => error);
    })
  );
};
