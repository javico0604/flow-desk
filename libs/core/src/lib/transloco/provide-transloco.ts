import { provideTransloco } from '@jsverse/transloco';
import { translocoConfig } from './transloco.config';
import { TranslocoHttpLoader } from './transloco.loader';

export function provideCoreTransloco() {
  return provideTransloco({
    config: translocoConfig,
    loader: TranslocoHttpLoader,
  });
}