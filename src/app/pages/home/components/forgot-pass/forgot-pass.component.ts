import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginComponent } from '../login/login.component';
import { IForgotPass, IResForgotPass } from '../../../../interfaces/user-action';
import { UserService } from '../../../../services/userservices/user.service';

@Component({
  selector: 'app-forgotpass',
  standalone: true,
  imports: [FormsModule, HttpClientModule, MatDialogModule, NgIf],
  templateUrl: './forgot-pass.component.html',
  styleUrl: './forgot-pass.component.css'
})
export class ForgotpassComponent {
  forgotPassObject!: IForgotPass;

  constructor( private dialog: MatDialog, private router: Router, private toaster: ToastrService, private userService: UserService) {
  }

  onSubmit(){
    this.userService.forgotPass(this.forgotPassObject)
      .subscribe({
		    next: (res: IResForgotPass) => {
	          this.toaster.success('Link to reset the password is sent.');
      	    this.router.navigate(["home"]);
	      },
        error: (error)=>{
          this.toaster.error(error.error.errorMessage);
        },
      });
  }

  openLogin(){
    const referenceVar = this.dialog.open(LoginComponent, {
      width: '350px',
      height: '400px'
    });
    referenceVar.afterClosed().subscribe(()=>{
      console.log("Pop-up closed");
    })
  }
}