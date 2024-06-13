import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ForgotPassInterface, LoginInterface, ResForgotPassInterface, ResGetUserInterface, ResLoginInterface, ResSignupInterface, ResetPassInterface, SignupInterface, UrlCheckInterface } from '../../interfaces/user-action';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private httpClient: HttpClient) { }

  login(LoginInterface: LoginInterface): Observable<ResLoginInterface> {
    return this.httpClient.post<ResLoginInterface>(`${environment.baseURL}Helperland/Login`, LoginInterface);
  }

  forgotPass(ForgotPassInterface: ForgotPassInterface): Observable<ResForgotPassInterface> {
    return this.httpClient.post<ResForgotPassInterface>(`${environment.baseURL}Helperland/ForgotPass`, ForgotPassInterface)
  }

  resetPassLink(UrlCheckInterface: UrlCheckInterface): Observable<ResForgotPassInterface> {
    return this.httpClient.post<ResForgotPassInterface>(`${environment.baseURL}Helperland/ResetPassLink`, UrlCheckInterface)
  }

  resetPass(ResetPassInterface: ResetPassInterface): Observable<ResForgotPassInterface> {
    return this.httpClient.post<ResForgotPassInterface>(`${environment.baseURL}Helperland/ResetPass`, ResetPassInterface)
  }

  signup(SignupInterface: SignupInterface): Observable<ResSignupInterface> {
    return this.httpClient.post<ResSignupInterface>(`${environment.baseURL}Helperland/Signup`, SignupInterface)
  }

  getUser(): Observable<ResGetUserInterface> {
    return this.httpClient.get<ResGetUserInterface>(`${environment.baseURL}Helperland/GetUsers`)
  }
}
