import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginComponent } from '../login/login.component';
import { IForgotPass, IResForgotPass } from '../../../../interfaces/user-action';
import { UserService } from '../../../../services/userservices/user.service';
import { LoaderComponent } from '../../../../components/loader/loader.component';

@Component({
  selector: 'app-forgotpass',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, MatDialogModule, NgIf, LoaderComponent],
  templateUrl: './forgot-pass.component.html',
  styleUrl: './forgot-pass.component.css'
})
export class ForgotpassComponent {
  loading = false;
  forgotPassForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor( private dialog: MatDialog, private router: Router, private toaster: ToastrService, private userService: UserService, private dialogRef: MatDialogRef<ForgotpassComponent>) {
  }

  getErrorMessage(controlName: string, displayName: string) {
    const control = this.forgotPassForm.get(controlName);
    if (control.hasError('required'))
      return `${displayName} is required`;
    else if (control.hasError('email')) 
      return `Invalid email format`;
    return '';
  }

  onSubmit(){
    this.loading = true;
    const forgotPassData: IForgotPass = {
      Email: this.forgotPassForm.get('email').value,
    };
      this.userService.forgotPass(forgotPassData)
      .subscribe({
		    next: (res: IResForgotPass) => {
	          this.toaster.success('Link to reset the password is sent.');
      	    this.router.navigate(["home"]);
            this.loading = false;
            this.dialogRef.close();
	      },
        error: (error)=>{
          if (error.error.type == "error") {
            this.toaster.error("Internal Server Error.");
          }
          else{
            this.toaster.error(error.error.errorMessage);
          }
          this.loading = false;
          this.dialogRef.close();
        },
      });
    
  }

  openLogin(){
    const referenceVar = this.dialog.open(LoginComponent, {
      width: '350px',
      height: '430px'
    });
    referenceVar.afterClosed().subscribe(()=>{
    })
  }
}