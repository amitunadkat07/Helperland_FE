import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from '../../interfaces/user-action';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private httpClient: HttpClient) { }

  zipCodeCheck(zipCode: string): Observable<IResponse<boolean>>{
    return this.httpClient.get<IResponse<boolean>>(`Booking/ZipCodeCheck?ZipCode=${zipCode}`)
  }
}
