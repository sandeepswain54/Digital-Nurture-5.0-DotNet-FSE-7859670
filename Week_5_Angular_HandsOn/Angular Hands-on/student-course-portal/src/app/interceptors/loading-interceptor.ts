import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading';

// Loading interceptor - shows spinner on HTTP calls
export const loadingInterceptor: HttpInterceptorFn =
  (req, next) => {
  const loadingService = inject(LoadingService);

  // Show spinner before request
  loadingService.show();

  return next(req).pipe(
    // finalize runs whether success or error
    // Equivalent to try/catch/finally
    finalize(() => {
      // Hide spinner after request completes
      loadingService.hide();
    })
  );
};
