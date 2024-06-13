import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { LoginComponent } from '../login/login.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { ResSignupInterface, SignupInterface } from '../../interfaces/user-action';
import { environment } from '../../environments/environment';
import { UserserviceService } from '../../services/userservices/userservice.service';

@Component({
  selector: 'app-signupcustomer',
  standalone: true,
  imports: [MatDialogModule, MatCheckboxModule, FormsModule, HttpClientModule, NgIf],
  templateUrl: './signupcustomer.component.html',
  styleUrl: './signupcustomer.component.css'
})
export class SignupcustomerComponent {
  signupObject: SignupInterface = { } as SignupInterface;

  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router, private toaster: ToastrService, private userService: UserserviceService){
    this.signupObject.RoleId = 2;
  }

  onSubmit(){
    this.userService.signup(this.signupObject)
      .subscribe({
        next: (res: ResSignupInterface) => {
          sessionStorage.setItem("name", res.firstName + " " + res.lastName);
          sessionStorage.setItem("email", res.email);
          sessionStorage.setItem("role", res.roleId.toString());
          this.toaster.success("Welcome to Helperland.......");
          this.router.navigate(['dashboard']);
        },
        error:(error)=>{
          this.toaster.error(error.error);
        },
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