import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../../services/userservices/user.service';
import { IResForgotPass, IResetPass, IResponse, IUrlCheck } from '../../../../interfaces/user-action';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoaderComponent } from '../../../../components/loader/loader.component';

@Component({
  selector: 'app-resetpass',
  standalone: true,
  imports: [FormsModule, NgIf, HttpClientModule, MatIconModule, MatTooltipModule, LoaderComponent],
  templateUrl: './reset-pass.component.html',
  styleUrl: './reset-pass.component.css'
})
export class ResetpassComponent {
  loading = false;
  urlObject: IUrlCheck;
  resetObject: IResetPass = {} as IResetPass;

  constructor(private routes: ActivatedRoute, private router: Router, private toaster: ToastrService, private userService: UserService) {
    this.routeValues();
  }

  ngOnInit(){
    this.resetPassLink();
  }

  routeValues(){
    this.routes.queryParams.subscribe(params => {
      this.urlObject = {
        ResetKey: params['t'],
        Email: params['e'],
        Date: params['dt']
      }
      this.resetObject.Email = params['e'];
    });
  }

  resetPassLink(){
    this.loading = true;
    this.userService.resetPassLink(this.urlObject)
      .subscribe({
        next: (res: IResponse<IResForgotPass>) => {
          if (res.isSuccess) {
            this.toaster.success(res.message);
          }
          else{
            this.toaster.error(res.message);
          }
          this.loading = false;
        },
        error: (error) => {
          this.toaster.error("Internal Server Error.");
          this.router.navigate(["home"]);
          this.loading = false;
        }
      });
  }

  onSubmit(){
    this.loading = true;
    this.userService.resetPass(this.resetObject)
      .subscribe({
        next: (res: IResponse<IResForgotPass>) => {
          if (res.isSuccess) {
            this.toaster.success(res.message);
          }
          else{
            this.toaster.error(res.message);
          }
          this.router.navigate(["home"]);
          this.loading = false;
        },
        error: (error)=>{
          this.toaster.error("Internal Server Error.");
          this.loading = false;
        },
      });
  }
}