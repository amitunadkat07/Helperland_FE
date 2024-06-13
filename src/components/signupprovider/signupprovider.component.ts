import { NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ResSignupInterface, SignupInterface } from '../../interfaces/user-action';
import { environment } from '../../environments/environment';
import { UserserviceService } from '../../services/userservices/userservice.service';

@Component({
  selector: 'app-signupprovider',
  standalone: true,
  imports: [MatCheckboxModule, MatDialogModule, FormsModule, HttpClientModule, NgIf],
  templateUrl: './signupprovider.component.html',
  styleUrl: './signupprovider.component.css'
})
export class SignupproviderComponent {
  signupObject: SignupInterface = { } as SignupInterface;

  constructor(private http: HttpClient, private dialog: MatDialog, private toaster: ToastrService, private userService: UserserviceService){
    this.signupObject.RoleId = 3;
  }

  onSubmit(){
    this.userService.signup(this.signupObject)
      .subscribe({
        next: (res: ResSignupInterface) => {
          sessionStorage.setItem("name", res.firstName + " " + res.lastName);
          sessionStorage.setItem("email", res.email);
          sessionStorage.setItem("role", res.roleId.toString());
          this.toaster.success("Welcome to Helperland.......");
        },
        error:(error)=>{
          this.toaster.error(error.error);
        },
      });
  }
}