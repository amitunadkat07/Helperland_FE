import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private sharedDataSubject = new BehaviorSubject<string>(null);
  sharedData = this.sharedDataSubject.asObservable();

  constructor() { }

  setSharedData(data: string) {
    this.sharedDataSubject.next(data);
  }
}
