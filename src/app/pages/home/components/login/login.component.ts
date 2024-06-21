import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SignupcustomerComponent } from '../signup-customer/signup-customer.component';
import { CommonModule, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { ForgotpassComponent } from '../forgot-pass/forgot-pass.component';
import { ILogin, IResLogin } from '../../../../interfaces/user-action';
import { UserService } from '../../../../services/userservices/user.service';
import {MatIconModule} from '@angular/material/icon';
import { LoaderComponent } from '../../../../components/loader/loader.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, MatDialogModule, NgIf, CommonModule, MatIconModule, LoaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  show = false;
  loading = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor( private dialog: MatDialog, private router: Router, private toaster: ToastrService, private userService: UserService, private dialogRef: MatDialogRef<LoginComponent>) {
  }

  getErrorMessage(controlName: string) {
    const control = this.loginForm.get(controlName);
    if (control.hasError('required'))
      return `${controlName} is required`;
    else if (control.hasError('email'))
      return `Invalid email format`;
    return '';
  }
  
  pwdShowHide() {
    this.show = !this.show;
  }

  onSubmit(){
    this.loading = true;
    const loginData: ILogin = {
      Email: this.loginForm.get('email').value,
      Password: this.loginForm.get('password').value
    };
      this.userService.login(loginData)
      .subscribe({
        next: (res: IResLogin) => {
          sessionStorage.setItem("Name", res.firstName + " " + res.lastName);
          sessionStorage.setItem("Email", res.email);
          sessionStorage.setItem("RoleId", res.roleId.toString());
          sessionStorage.setItem("Token", res.token);
          sessionStorage.setItem("IsLoggedIn", "true");
          this.toaster.success('Logged in Successfully.');
          this.router.navigate(["dashboard"]);
          this.loading = false;
          this.dialogRef.close();
        },
        error: (error) => {
          if (error.error.type == "error") {
            this.toaster.error("Internal Server Error.");
            this.loading = false
            this.dialogRef.close();
          }
          else if (error.error.errorMessage == "Either Email or Password is incorrect, Please check and try again!") {
            this.toaster.error(error.error.errorMessage);
            this.loading = false;
          }
          else{
            this.toaster.error(error.error.errorMessage);
            this.loading = false
            this.dialogRef.close();
          }
        },
      });
  }

  openSignup(){
    const referenceVar = this.dialog.open(SignupcustomerComponent, {
      width: '500px',
      height: '520px'
    });
    referenceVar.afterClosed().subscribe(()=>{
    })
  }

  openForgetPassword(){
    const referenceVar = this.dialog.open(ForgotpassComponent, {
      width: '370px',
      height: '300px'
    });
    referenceVar.afterClosed().subscribe(()=>{
    })
  }
}