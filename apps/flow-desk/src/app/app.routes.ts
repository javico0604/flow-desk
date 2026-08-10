import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'auth',
    loadChildren: () =>
      import('@flow-desk/feature').then((m) => m.authRoutes),
  },

  {
    path: '',
    loadComponent: () =>
      import('@flow-desk/core-ui').then(
        (m) => m.RouterOutletComponent
      ),
    children: [
      {
        path: 'projects',
        loadChildren: () =>
          import('@flow-desk/feature').then(
            (m) => m.projectsRoutes
          ),
      },
    ],
  },

  {
    path: '**',
    redirectTo: '/projects',
  },
];