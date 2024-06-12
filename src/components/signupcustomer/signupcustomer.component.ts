import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { LoginComponent } from '../login/login.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { SignupInterface } from '../../interfaces/user-action';

@Component({
  selector: 'app-signupcustomer',
  standalone: true,
  imports: [MatDialogModule, MatCheckboxModule, FormsModule, HttpClientModule, NgIf],
  templateUrl: './signupcustomer.component.html',
  styleUrl: './signupcustomer.component.css'
})
export class SignupcustomerComponent {
  signupObject: SignupInterface = {
    Email: '',
    Password: '',
    FirstName: '',
    LastName: '',
    ConfPassword: '',
    Contact: '',
    RoleId: 3
  }

  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router, private toaster: ToastrService){
  }

  onSubmit(){
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

  openLogin(){
    const referenceVar = this.dialog.open(LoginComponent, {
      width: '350px',
      height: '380px'
    });
    referenceVar.afterClosed().subscribe(()=>{
      console.log("Pop-up closed");
    })
  }
}