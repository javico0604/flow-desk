import { Route } from '@angular/router';

export const authRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register').then(
        (m) => m.RegisterComponent,
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login').then(
        (m) => m.LoginComponent,
      ),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];