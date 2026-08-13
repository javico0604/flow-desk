import { inject, Injectable } from "@angular/core";
import { TranslocoService } from "@jsverse/transloco";

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
    private translocoService = inject(TranslocoService)

    public setTranslation(
        namespace: string,
        translations: any
    ) {
        for (const lang of Object.keys(translations)) {
            const scopeTranslations = {
                [namespace]: translations[lang]
            };
            this.translocoService.setTranslation(scopeTranslations, lang)
        }
    }
}