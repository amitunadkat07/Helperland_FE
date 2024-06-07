import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { LoginComponent } from '../login/login.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signupcustomer',
  standalone: true,
  imports: [MatDialogModule, MatCheckboxModule, FormsModule, HttpClientModule, NgIf],
  templateUrl: './signupcustomer.component.html',
  styleUrl: './signupcustomer.component.css'
})
export class SignupcustomerComponent {
  signupObject: Signup;

  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router){
    this.signupObject = new Signup();
  }

  toaster = inject(ToastrService);

  onSubmit(): void {
    this.http
      .post('https://localhost:44374/api/Helperland/Signup', this.signupObject)
      .subscribe((res: any) => {
          sessionStorage.setItem("name", res.firstName + " " + res.lastName);
          sessionStorage.setItem("email", res.email);
          sessionStorage.setItem("role", res.roleId);
          this.toaster.success("Welcome to Helperland.......");
          this.router.navigate(['dashboard']);
      },
    (error)=>{
      this.toaster.error(error.error);
    });
  }

  openLogin():void{
    const referenceVar = this.dialog.open(LoginComponent, {
      width: '350px',
      height: '380px'
    });
    referenceVar.afterClosed().subscribe(()=>{
      console.log("Pop-up closed");
    })
  }
}

export class Signup {
  Email: string;
  Password: string;
  FirstName: string;
  LastName: string;
  ConfPassword: string;
  Contact: string;
  RoleId: any;
  constructor() {
    this.Email = '';
    this.Password = '';
    this.FirstName = '';
    this.LastName = '';
    this.ConfPassword = '';
    this.Contact = '';
    this.RoleId = 2;
  }
}