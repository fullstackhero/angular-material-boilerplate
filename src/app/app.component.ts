import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { LocalStorageService } from './core/services/local-storage.service';
import { MultilingualService } from './core/services/multilingual.service';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  themeVariant: string = '';
  darkModeIcon: string = '';
  constructor(private authService: AuthService, private translationService: MultilingualService, private themeService: ThemeService, private overlay: OverlayContainer) {
  }

  ngOnInit(): void {
    this.loadCurrentUser();
    this.loadDefaults();
  }

  loadDefaults() {
    this.translationService.loadDefaultLanguage();
    this.themeService.setThemeFromLocalStorage();
  }

  loadCurrentUser() {
    this.authService.loadCurrentUser()
      .subscribe(() => {
      }, error => {
        console.log(error);
      });
  }
}
