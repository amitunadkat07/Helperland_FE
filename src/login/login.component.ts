import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SignupcustomerComponent } from '../signupcustomer/signupcustomer.component';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { ForgotpassComponent } from '../forgotpass/forgotpass.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, MatDialogModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginObject: Login;

  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router) {
    this.loginObject = new Login();
  }

  toaster = inject(ToastrService);

  onSubmit(): void {
    this.http
      .post('https://localhost:44374/api/Helperland/Login', this.loginObject)
      .subscribe({
        next: (res: any) => {
          sessionStorage.setItem("Name", res.firstName + " " + res.lastName);
          sessionStorage.setItem("Email", res.email);
          sessionStorage.setItem("RoleId", res.roleId);
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

  pwdShowHide(): void {
    const x: HTMLInputElement | null = document.getElementById("password") as HTMLInputElement;
    if (x?.type === "password") {
        x.type = "text";
        document.querySelectorAll(".showImg").forEach((Image: Element) => (Image as HTMLElement).style.display = "none");
        document.querySelectorAll(".hideImg").forEach((Image: Element) => (Image as HTMLElement).style.display = "block");
    } 
    else if (x) {
        x.type = "password";
        document.querySelectorAll(".hideImg").forEach((Image: Element) => (Image as HTMLElement).style.display = "none");
        document.querySelectorAll(".showImg").forEach((Image: Element) => (Image as HTMLElement).style.display = "block");
    }
  }

  openSignup():void{
    const referenceVar = this.dialog.open(SignupcustomerComponent, {
      width: '370px',
      height: '420px'
    });
    referenceVar.afterClosed().subscribe(()=>{
      console.log("Pop-up closed");
    })
  }

  openForgetPassword():void{
    const referenceVar = this.dialog.open(ForgotpassComponent, {
      width: '370px',
      height: '300px'
    });
    referenceVar.afterClosed().subscribe(()=>{
      console.log("Pop-up closed");
    })
  }
}

export class Login {
  Email: string;
  Password: string;
  constructor() {
    this.Email = '';
    this.Password = '';
  }
}