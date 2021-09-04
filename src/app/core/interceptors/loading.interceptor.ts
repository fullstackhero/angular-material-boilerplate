import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { BusyService } from '../services/busy.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private busyService: BusyService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    var isFiltering = request.params.get('searchString');
    if (isFiltering === '' || isFiltering === undefined || isFiltering === null){
      this.busyService.isOverlay.next(true);
    } else { 
      this.busyService.isOverlay.next(false);
    }
    
    this.busyService.isLoading.next(true);
    return next.handle(request).pipe(
      delay(500),
      finalize(
        () => {
          this.busyService.isLoading.next(false);
        }
      )
    );
  }
}
