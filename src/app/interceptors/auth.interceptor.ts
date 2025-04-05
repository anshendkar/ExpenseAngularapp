import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    // Decode the token to check for expiration
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
    const isExpired = payload.exp * 1000 < Date.now(); // Check if expired

    if (isExpired) {
      alert('Token is expired. Please log in again.');
      authService.logout();
      return next(req); // Proceed without adding the token
    }
  }

  // Clone the request and add the Authorization header if the token is valid
  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(authReq);
};