import { TranslocoConfig, TRANSLOCO_CONFIG } from '@jsverse/transloco';

export const translocoConfig: TranslocoConfig = {
    availableLangs: ['es', 'en'],
    defaultLang: 'es',
    reRenderOnLangChange: true,
    prodMode: false,
    failedRetries: 0,
    flatten: {
        aot: false
    },
    missingHandler: {
        logMissingKey: false,
        useFallbackTranslation: false,
        allowEmpty: false
    },
    interpolation: ['es', 'en'],
    scopes: {
        keepCasing: undefined,
        autoPrefixKeys: undefined
    }
};