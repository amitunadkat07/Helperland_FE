import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAddress, IError, IForgotPass, IGetProfile, ILogin, IPasswordChange, IResForgotPass, IResGetAddress, IResGetProfile, IResGetUser, IResLogin, IResPasswordChange, IResSignup, IResetPass, ISignup, IUrlCheck } from '../../interfaces/user-action';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  login(ILogin: ILogin): Observable<IResLogin> {
    return this.httpClient.post<IResLogin>('Helperland/Login', ILogin);
  }

  forgotPass(IForgotPass: IForgotPass): Observable<IResForgotPass> {
    return this.httpClient.post<IResForgotPass>('Helperland/ForgotPass', IForgotPass)
  }

  resetPassLink(IUrlCheck: IUrlCheck): Observable<IResForgotPass> {
    return this.httpClient.post<IResForgotPass>('Helperland/ResetPassLink', IUrlCheck)
  }

  resetPass(IResetPass: IResetPass): Observable<IResForgotPass> {
    return this.httpClient.post<IResForgotPass>('Helperland/ResetPass', IResetPass)
  }

  signup(ISignup: ISignup): Observable<IResSignup> {
    return this.httpClient.post<IResSignup>('Helperland/Signup', ISignup)
  }

  getUser(): Observable<IResGetUser[]> {
    return this.httpClient.get<IResGetUser[]>('Helperland/GetUsers')
  }

  getProfile(email: String): Observable<IResGetProfile>{
    return this.httpClient.get<IResGetProfile>(`Helperland/GetProfile?email=${email}`)
  }

  updateProfile(IGetProfile: IGetProfile): Observable<IResGetProfile>{
    return this.httpClient.put<IResGetProfile>('Helperland/UpdateProfile', IGetProfile)
  }

  updatePassword(IPasswordChange: IPasswordChange): Observable<IResPasswordChange>{
    return this.httpClient.put<IResPasswordChange>('Helperland/UpdatePassword', IPasswordChange)
  }

  getAddressByUser(email: String): Observable<IResGetAddress[]>{
    return this.httpClient.get<IResGetAddress[]>(`Helperland/GetAddressByUser?email=${email}`)
  }

  getAddressById(id: number): Observable<IResGetAddress>{
    return this.httpClient.get<IResGetAddress>(`Helperland/GetAddressById?id=${id}`)
  }

  addAddress(IAddress: IAddress): Observable<IError>{
    return this.httpClient.post<IError>('Helperland/CreateAddress', IAddress)
  }

  deleteAddress(addressId: number): Observable<any>{
    return this.httpClient.delete<any>(`Helperland/DeleteAddress?id=${addressId}`)
  }

  editAddress(IAddress: IAddress): Observable<IError>{
    return this.httpClient.put<IError>('Helperland/UpdateAddress', IAddress)
  }
}
