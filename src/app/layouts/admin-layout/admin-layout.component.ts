import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/core/services/auth.service';
import {BusyService} from 'src/app/core/services/busy.service';
import {NavItem} from '../../core/navigation/nav-item';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  title = 'fullstackhero';
  fullName: string;
  email: string;
  alertIsVisible = true;
  navigation: NavItem[] = [
    {
      id: 'navigation', title: 'nav feature', subtitle: 'my group', type: 'group', children: [
        {
          id: 'navigation-features.level.0', title: 'Level 0', type: 'collapsable', children: [
            {
              id: 'navigation-features.level.0.1', title: 'Level 1', type: 'collapsable', children: [
                {id: 'navigation-features.level.0.1.2', title: 'Level 2', type: 'collapsable'}]
            }]
        }],
    },
    {
      id: 'pages', title: 'Pages', subtitle: 'my pages', type: 'group', children: [
        {id: 'pages.1', title: 'page1', type: 'item', link: '/pages/page1'},
        {
          id: 'pages.2', title: 'page2', type: 'collapsable', children: [
            {
              id: 'pages.2.1', title: 'pages.2.1', type: 'collapsable', children: [
                {id: 'pages.2.1.1', title: 'pages.2.1.1', subtitle: 'do NOT click', type: 'item', link: '/pages/pages.2/pages.2.1/pages.2.1.1'},
                {id: 'pages.2.1.2', title: 'pages.2.1.2', type: 'item', link: '/pages/pages.2/pages.2.1/pages.2.1.2'},
                {id: 'pages.2.1.3', title: 'pages.2.1.3', type: 'item', link: '/pages/pages.2/pages.2.1/pages.2.1.3'}
              ]
            }]
        }]
    }];

  constructor(private authService: AuthService, public busyService: BusyService) {
  }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(): void {
    this.fullName = this.authService.getFullName;
    this.email = this.authService.getEmail;
  }

  hideAlert(): void {
    this.alertIsVisible = false;

  }
}
