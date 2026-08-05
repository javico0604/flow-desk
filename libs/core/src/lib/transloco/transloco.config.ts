import { TranslocoConfig } from '@jsverse/transloco';

export const translocoConfig: TranslocoConfig = {
  availableLangs: ['es', 'en'],
  defaultLang: 'es',
  fallbackLang: 'es',

  reRenderOnLangChange: true,
  prodMode: false,

  failedRetries: 2,
  flatten: {
    aot: false,
  },
  missingHandler: {
    useFallbackTranslation: true,
    allowEmpty: false,
    logMissingKey: false
  },
  interpolation: ['{{', '}}'],
  scopes: {},
};