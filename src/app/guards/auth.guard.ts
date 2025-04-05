import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  
  // Check if the user is authenticated
  if (authService.isAuthenticated()) {
    return true; // Allow access to the route
  }

  // Redirect to login if not authenticated
  window.alert('You are not authenticated! Redirecting to login page.');
  window.location.href = '/login'; // Update as per your application's login route

  return false; // Deny access to the route
};