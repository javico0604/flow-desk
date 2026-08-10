import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';

import { UserService } from '@flow-desk/data-access';

export const authGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  return userService.getMe().pipe(
    map(() => true),
    catchError(() =>
      of(router.createUrlTree(['/auth/login']))
    ),
  );
};