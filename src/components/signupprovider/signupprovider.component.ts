import { NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SignupInterface } from '../../interfaces/user-action';

@Component({
  selector: 'app-signupprovider',
  standalone: true,
  imports: [MatCheckboxModule, MatDialogModule, FormsModule, HttpClientModule, NgIf],
  templateUrl: './signupprovider.component.html',
  styleUrl: './signupprovider.component.css'
})
export class SignupproviderComponent {
  signupObject: SignupInterface = {
    Email: '',
    Password: '',
    FirstName: '',
    LastName: '',
    ConfPassword: '',
    Contact: '',
    RoleId: 3
  }

  constructor(private http: HttpClient, private dialog: MatDialog, private toaster: ToastrService){
  }

  onSubmit(){
    this.http
      .post('https://localhost:44374/api/Helperland/Signup', this.signupObject)
      .subscribe((res: any) => {
          sessionStorage.setItem("name", res.firstName + " " + res.lastName);
          sessionStorage.setItem("email", res.email);
          sessionStorage.setItem("role", res.roleId);
          this.toaster.success("Welcome to Helperland......");
      },
    (error)=>{
      this.toaster.error(error.error);
    });
  }
}