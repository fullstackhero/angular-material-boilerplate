import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class BusyService {
  
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public isOverlay: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  
  constructor() { }
}
