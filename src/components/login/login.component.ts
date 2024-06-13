import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SignupcustomerComponent } from '../signupcustomer/signupcustomer.component';
import { CommonModule, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { ForgotpassComponent } from '../forgotpass/forgotpass.component';
import { LoginInterface, ResLoginInterface } from '../../interfaces/user-action';
import { environment } from '../../environments/environment';
import { UserserviceService } from '../../services/userservices/userservice.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, MatDialogModule, NgIf, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  password: string;
  show = false;
  loginObject: LoginInterface = {} as LoginInterface;

  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router, private toaster: ToastrService, private userService: UserserviceService) {
    this.password = 'password';
  }
  
  pwdShowHide() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }

  onSubmit(){
    this.userService.login(this.loginObject)
      .subscribe({
        next: (res: ResLoginInterface) => {
          sessionStorage.setItem("Name", res.firstName + " " + res.lastName);
          sessionStorage.setItem("Email", res.email);
          sessionStorage.setItem("RoleId", res.roleId.toString());
          sessionStorage.setItem("Token", res.token);
          this.toaster.success('Logged in Successfully...');
          this.router.navigate(["dashboard"]);
        },
        error: (error) => {
          console.log(error);
          this.toaster.error(error);
        },
      });
  }

  openSignup(){
    const referenceVar = this.dialog.open(SignupcustomerComponent, {
      width: '370px',
      height: '420px'
    });
    referenceVar.afterClosed().subscribe(()=>{
      console.log("Pop-up closed");
    })
  }

  openForgetPassword(){
    const referenceVar = this.dialog.open(ForgotpassComponent, {
      width: '370px',
      height: '300px'
    });
    referenceVar.afterClosed().subscribe(()=>{
      console.log("Pop-up closed");
    })
  }
}