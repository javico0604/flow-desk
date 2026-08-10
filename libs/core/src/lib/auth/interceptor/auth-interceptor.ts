import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@flow-desk/data-access';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const token = authService.getAccessToken();

  const headers = token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : undefined;

  return next(
    req.clone({
      withCredentials: true,
      setHeaders: headers,
    }),
  );
};