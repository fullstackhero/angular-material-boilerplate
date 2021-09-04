import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorageService} from './local-storage.service';

@Injectable()
export class MultilingualService {

  constructor(private translateService: TranslateService, private localStorage: LocalStorageService) {
    this.translateService.use('en');
  }

  changeLanguage(languageCode: string) {
    this.localStorage.setItem('locale', languageCode);
    this.translateService.use(languageCode);
  }

  currentLanguage() {
    return this.localStorage.getItem('locale') ?? 'en';
  }

  loadDefaultLanguage() {
    let defaultLanguage = this.localStorage.getItem('locale') ?? 'en';
    this.translateService.use(defaultLanguage);
  }
}
