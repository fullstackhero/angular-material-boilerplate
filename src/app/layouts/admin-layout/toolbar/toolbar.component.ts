import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/core/services/auth.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { LogoutDialogComponent } from 'src/app/core/shared/components/logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() darkModeIcon: string;
  @Input() inputSideNav: MatSidenav;
  @Input() isDarkMode: boolean;
  @Output('darkModelToggled') darkModelToggled = new EventEmitter<{ isDarkMode: boolean, darkModeIcon: string }>();
  fullName: string;
  email: string;

  constructor(private localStorageService: LocalStorageService, public authService: AuthService, public dialog: MatDialog,private themeService:ThemeService) { }

  ngOnInit() {
    let themeVariant = this.localStorageService.getItem('themeVariant');
    this.darkModeIcon = themeVariant === 'dark-theme' ? 'bedtime' : 'wb_sunny';
    this.isDarkMode = themeVariant === 'dark-theme';
    this.fullName = this.authService.getFullName;
    this.email = this.authService.getEmail;
  }

  toggleDarkMode() {
    this.isDarkMode = this.themeService.toggleDarkMode();
    this.darkModeIcon = this.isDarkMode ? 'bedtime' : 'wb_sunny'
  }

  openLogoutDialog() {
    const dialogRef = this.dialog.open(LogoutDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.authService.logout();
    });
  }
}
