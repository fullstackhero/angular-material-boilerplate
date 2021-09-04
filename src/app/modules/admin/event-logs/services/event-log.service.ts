import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventLogApiService } from 'src/app/core/api/event-logs/event-log-api.service';
import { EventLog } from 'src/app/core/models/event-logs/event-log';
import { PaginatedResult } from 'src/app/core/models/wrappers/PaginatedResult';
import { EventLogParams } from '../models/eventLogParams';

@Injectable({
  providedIn: 'root'
})
export class EventLogService {

  constructor(private api: EventLogApiService) {
  }

  getEventLogs(eventLogParams: EventLogParams): Observable<PaginatedResult<EventLog>> {
    let params = new HttpParams();
    if (eventLogParams.searchString) params = params.append('searchString', eventLogParams.searchString.toString());
    if (eventLogParams.pageNumber) params = params.append('pageNumber', eventLogParams.pageNumber.toString());
    if (eventLogParams.pageSize) params = params.append('pageSize', eventLogParams.pageSize.toString());
    return this.api.getAlls(params)
      .pipe(map((response: PaginatedResult<EventLog>) => response));
  }
}
