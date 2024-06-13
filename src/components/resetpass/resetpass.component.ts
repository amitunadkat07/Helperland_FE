import { NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResForgotPassInterface, ResetPassInterface, UrlCheckInterface } from '../../interfaces/user-action';
import { environment } from '../../environments/environment';
import { UserserviceService } from '../../services/userservices/userservice.service';
import { error } from 'node:console';

@Component({
  selector: 'app-resetpass',
  standalone: true,
  imports: [FormsModule, NgIf, HttpClientModule],
  templateUrl: './resetpass.component.html',
  styleUrl: './resetpass.component.css'
})
export class ResetpassComponent {
  urlObject: UrlCheckInterface = { } as UrlCheckInterface;
  resetObject: ResetPassInterface = { } as ResetPassInterface;

  constructor(private http: HttpClient, private routes: ActivatedRoute, private router: Router, private toaster: ToastrService, private userService: UserserviceService) {

    this.routes.queryParams.subscribe(params => {
      this.urlObject.ResetKey = params['t'];
      this.urlObject.Email = params['e'];
      this.resetObject.Email = params['e'];
    });
  }

  ngOnInit(){
    this.userService.resetPassLink(this.urlObject)
      .subscribe({
        next: (res: ResForgotPassInterface) => {
          this.toaster.success('You can change your password, but please remember to follow security guidelines...');
        },
        error: (error) => {
          this.toaster.error(error.error.errorMessage);
          this.router.navigate([""]);
        }
      });
  }

  onSubmit(){
    this.userService.resetPass(this.resetObject)
      .subscribe({
        next: (res: ResForgotPassInterface) => {
          this.toaster.success('Password changed successfully...');
          this.router.navigate([""]);
        },
        error: (error)=>{
          this.toaster.error(error.error.errorMessage);
        },
      });
  }
}