import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../../services/userservices/user.service';
import { IResForgotPass, IResetPass, IUrlCheck } from '../../../../interfaces/user-action';

@Component({
  selector: 'app-resetpass',
  standalone: true,
  imports: [FormsModule, NgIf, HttpClientModule],
  templateUrl: './reset-pass.component.html',
  styleUrl: './reset-pass.component.css'
})
export class ResetpassComponent {
  urlObject!: IUrlCheck;
  resetObject!: IResetPass;

  constructor( private routes: ActivatedRoute, private router: Router, private toaster: ToastrService, private userService: UserService) {

    this.routes.queryParams.subscribe(params => {
      this.urlObject.ResetKey = params['t'];
      this.urlObject.Email = params['e'];
      this.resetObject.Email = params['e'];
    });
  }

  ngOnInit(){
    this.userService.resetPassLink(this.urlObject)
      .subscribe({
        next: (res: IResForgotPass) => {
          this.toaster.success('You can change your password, but please remember to follow security guidelines.');
        },
        error: (error) => {
          this.toaster.error(error.error.errorMessage);
          this.router.navigate(["home"]);
        }
      });
  }

  onSubmit(){
    this.userService.resetPass(this.resetObject)
      .subscribe({
        next: (res: IResForgotPass) => {
          this.toaster.success('Password changed successfully.');
          this.router.navigate(["home"]);
        },
        error: (error)=>{
          this.toaster.error(error.error.errorMessage);
        },
      });
  }
}