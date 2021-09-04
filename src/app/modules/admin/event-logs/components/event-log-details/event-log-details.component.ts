import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EventLog } from 'src/app/core/models/event-logs/event-log';

@Component({
  selector: 'app-event-log-details',
  templateUrl: './event-log-details.component.html',
  styleUrls: ['./event-log-details.component.scss']
})
export class EventLogDetailsComponent implements OnInit {

  brandForm: FormGroup;
  formTitle: string = "Event Log Details";
  constructor(@Inject(MAT_DIALOG_DATA) public data: EventLog, private toastr: ToastrService, private fb: FormBuilder) { }
  jsonData;
  jsonOldValues;
  jsonNewValues;

  ngOnInit(): void {
    this.jsonData = this.parseToJson(this.data.data);
    this.jsonNewValues = this.parseToJson(this.data.newValues);
    this.jsonOldValues = this.parseToJson(this.data.oldValues);
  }
  parseToJson(str: string) {
    if (str) {
      var json = JSON.parse(str);
      if (json) {
        Object.keys(json).forEach(function (k) {
          try {
            if (json[k]) {
              json[k] = JSON.parse(json[k])
            }
          }
          catch
          { }
        });
      }
      return json;
    }
  }
}
