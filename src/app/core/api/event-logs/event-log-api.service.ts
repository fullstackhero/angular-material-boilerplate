import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EventLog } from '../../models/event-logs/event-log';
import { PaginatedResult } from '../../models/wrappers/PaginatedResult';

@Injectable({
  providedIn: 'root'
})
export class EventLogApiService {

  baseUrl = environment.apiUrl + 'identity/eventlogs';

  constructor(private http: HttpClient) {
  }

  getAlls(params: HttpParams) {
    return this.http.get<PaginatedResult<EventLog>>(this.baseUrl, {params: params});
  }
}
