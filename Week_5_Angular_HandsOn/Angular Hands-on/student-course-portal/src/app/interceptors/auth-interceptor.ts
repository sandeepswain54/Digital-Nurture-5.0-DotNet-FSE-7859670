import { HttpInterceptorFn } from '@angular/common/http';

// Auth interceptor - adds Bearer token to all requests
export const authInterceptor: HttpInterceptorFn =
  (req, next) => {

  // Clone request and add Authorization header
  const authReq = req.clone({
    setHeaders: {
      Authorization: 'Bearer mock-token-12345'
    }
  });

  console.log('Auth Interceptor: Added token to request');
  return next(authReq);
};
