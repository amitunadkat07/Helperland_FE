import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private httpClient: HttpClient) { }

  zipCodeCheck(zipCode: string){
    return this.httpClient.get(`Booking/ZipCodeCheck?ZipCode=${zipCode}`)
  }
}
