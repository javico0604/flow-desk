import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

import { provideNzIcons } from 'ng-zorro-antd/icon';

import { authInterceptor, icons } from '@flow-desk/core';
import { provideCoreTransloco } from '@flow-desk/core';
import { API_URL, AuthService, provideApi } from '@flow-desk/data-access';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    provideCoreTransloco(),
    provideNzIcons(icons),
    provideApi(environment.apiUrl),
    provideHttpClient(
      withInterceptors([
        authInterceptor,
      ]),
    ),
     {
      provide: API_URL,
      useValue: environment.apiUrl,
    },
    provideAppInitializer(() => {
      const authService = inject(AuthService);

      return authService.init();
    }),
  ],
};