import { NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signupprovider',
  standalone: true,
  imports: [MatCheckboxModule, MatDialogModule, FormsModule, HttpClientModule, NgIf],
  templateUrl: './signupprovider.component.html',
  styleUrl: './signupprovider.component.css'
})
export class SignupproviderComponent {
  signupObject: Signup;

  constructor(private http: HttpClient, private dialog: MatDialog){
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
          this.toaster.success("Welcome to Helperland......");
      },
    (error)=>{
      this.toaster.error(error.error);
    });
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
    this.RoleId = 3;
  }
}