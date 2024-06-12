import { NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResetPassInterface, UrlCheckInterface } from '../../interfaces/user-action';

@Component({
  selector: 'app-resetpass',
  standalone: true,
  imports: [FormsModule, NgIf, HttpClientModule],
  templateUrl: './resetpass.component.html',
  styleUrl: './resetpass.component.css'
})
export class ResetpassComponent {
  urlObject: UrlCheckInterface ={
    Email: '',
    ResetKey: ''
  }
  resetObject: ResetPassInterface = {
    Email: '',
    Password: ''
  }

  constructor(private http: HttpClient, private routes: ActivatedRoute, private router: Router, private toaster: ToastrService) {

    this.routes.queryParams.subscribe(params => {
      this.urlObject.ResetKey = params['t'];
      this.urlObject.Email = params['e'];
      this.resetObject.Email = params['e'];
    });
  }

  ngOnInit(){
    this.http
      .post('https://localhost:44374/api/Helperland/ResetPassLink', this.urlObject)
      .subscribe((res: any) => {
        this.toaster.success('You can change your password, but please remember to follow security guidelines...');
      },
    (error)=>{
      this.toaster.error(error.error.errorMessage);
      this.router.navigate([""]);
    });
  }

  onSubmit(){
    this.http
      .post('https://localhost:44374/api/Helperland/ResetPass', this.resetObject)
      .subscribe((res: any) => {
          this.toaster.success('Password changed successfully...');
          this.router.navigate([""]);
      },
    (error)=>{
      this.toaster.error(error.error.errorMessage);
    });
  }
}