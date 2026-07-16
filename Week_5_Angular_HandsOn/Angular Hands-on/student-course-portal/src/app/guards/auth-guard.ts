import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

// Hardcoded for demo - in real app check auth service
const isLoggedIn = true;

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (isLoggedIn) {
    console.log('Auth Guard: Access granted!');
    return true;
  } else {
    console.log('Auth Guard: Access denied! Redirecting...');
    router.navigate(['/']);
    return false;
  }
};
