import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private storage: LocalStorageService) { }
  toggleDarkMode() {
    console.log('Hi');
    if (this.isDarkMode()) {
      document.querySelector('.mat-app-background').classList.remove('dark-theme');
      document.querySelector('.mat-app-background').classList.add('light-theme');
      this.storage.setItem('themeVariant', 'light-theme');
      return false;
    }
    else {
      document.querySelector('.mat-app-background').classList.add('dark-theme');
      document.querySelector('.mat-app-background').classList.remove('light-theme');
      this.storage.setItem('themeVariant', 'dark-theme');
      return true;
    }
  }
  isDarkMode() {
    if (this.storage.getItem('themeVariant') == 'dark-theme') {
      return true;
    }
    return false;
  }
  setThemeFromLocalStorage() {
    if (this.isDarkMode()) {
      document.querySelector('.mat-app-background').classList.add('dark-theme');
    }
  }
}
