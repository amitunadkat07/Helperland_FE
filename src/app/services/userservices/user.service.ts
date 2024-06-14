import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IForgotPass, ILogin, IResForgotPass, IResGetUser, IResLogin, IResSignup, IResetPass, ISignup, IUrlCheck } from '../../interfaces/user-action';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  login(ILogin: ILogin): Observable<IResLogin> {
    return this.httpClient.post<IResLogin>(`${environment.baseURL}Helperland/Login`, ILogin);
  }

  forgotPass(IForgotPass: IForgotPass): Observable<IResForgotPass> {
    return this.httpClient.post<IResForgotPass>(`${environment.baseURL}Helperland/ForgotPass`, IForgotPass)
  }

  resetPassLink(IUrlCheck: IUrlCheck): Observable<IResForgotPass> {
    return this.httpClient.post<IResForgotPass>(`${environment.baseURL}Helperland/ResetPassLink`, IUrlCheck)
  }

  resetPass(IResetPass: IResetPass): Observable<IResForgotPass> {
    return this.httpClient.post<IResForgotPass>(`${environment.baseURL}Helperland/ResetPass`, IResetPass)
  }

  signup(ISignup: ISignup): Observable<IResSignup> {
    return this.httpClient.post<IResSignup>(`${environment.baseURL}Helperland/Signup`, ISignup)
  }

  getUser(): Observable<IResGetUser> {
    return this.httpClient.get<IResGetUser>(`${environment.baseURL}Helperland/GetUsers`)
  }
}
