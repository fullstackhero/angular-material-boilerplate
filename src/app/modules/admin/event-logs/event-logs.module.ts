import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventLogDetailsComponent } from './components/event-log-details/event-log-details.component';
import { MaterialModule } from 'src/app/core/material/material.module';

@NgModule({
  declarations: [
    EventLogDetailsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class ActivityLogsModule { }
