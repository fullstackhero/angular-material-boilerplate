import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';

import {VNavItemComponent} from './vertical/components/v-nav-item.component';
import {VNavCollapsableComponent} from './vertical/components/v-nav-collapsable.component';
import {VNavDividerComponent} from './vertical/components/v-nav-divider.component';
import {VNavGroupComponent} from './vertical/components/v-nav-group.component';
import {VNavSpacerComponent} from './vertical/components/v-nav-spacer.component';
import {VNavComponent} from './vertical/v-nav.component';
import {NavService} from './navigation.service';

@NgModule({
  declarations: [
    VNavItemComponent,
    VNavCollapsableComponent,
    VNavDividerComponent,
    VNavGroupComponent,
    VNavSpacerComponent,
    VNavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule
  ],
  exports: [
    VNavComponent
  ],
  providers: [NavService]
})
export class NavigationModule {
}
