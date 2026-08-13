import { Route } from '@angular/router';
import { authGuard } from '@flow-desk/core';

export const projectsRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./projects/projects').then(
        (m) => m.ProjectsComponent,
      ),
  },
  {
    path: ':projectId',
    loadComponent: () =>
      import('./project/project').then(
        (m) => m.ProjectComponent,
      ),
  },
  {
    path: '**',
    redirectTo: 'projects',
  },
];