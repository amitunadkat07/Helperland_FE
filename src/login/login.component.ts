import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SignupcustomerComponent } from '../signupcustomer/signupcustomer.component';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

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
      .subscribe((res: any) => {
          sessionStorage.setItem("name", res.firstName + " " + res.lastName);
          sessionStorage.setItem("email", res.email);
          sessionStorage.setItem("role", res.roleId);
          alert('Logged in Successfully...');
      },
    (error)=>{
      alert(error.error);
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
}

export class Login {
  Email: string;
  Password: string;
  constructor() {
    this.Email = '';
    this.Password = '';
  }
}