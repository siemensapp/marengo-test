import { Injectable } from '@angular/core';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Injectable({providedIn: 'root'})
export class LocalisationService {

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    this.translate.onLangChange.subscribe(this.storeLanguage);
  }

  detectLanguage() {
    const browserLanguage = this.translate.getBrowserLang();
    const localLanguage = this.loadLanguage();

    const lang = localLanguage || browserLanguage;
    this.setUserLanguage(lang);
  }

  setUserLanguage(language: string) {
    this.translate.use(language);
  }

  storeLanguage(event: LangChangeEvent) {
    localStorage['lang'] = event.lang;
  }

  loadLanguage(): string {
    return localStorage['lang'] || this.translate.currentLang;
  }
}
