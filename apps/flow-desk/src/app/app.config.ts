import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

import { provideNzIcons } from 'ng-zorro-antd/icon';

import { icons } from '@flow-desk/core';
import { provideCoreTransloco } from '@flow-desk/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    provideCoreTransloco(),
    provideNzIcons(icons)
  ],
};