import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IResSignup, ISignup } from '../../../../interfaces/user-action';
import { UserService } from '../../../../services/userservices/user.service';

@Component({
  selector: 'app-signupprovider',
  standalone: true,
  imports: [MatCheckboxModule, MatDialogModule, FormsModule, HttpClientModule, NgIf],
  templateUrl: './signup-provider.component.html',
  styleUrl: './signup-provider.component.css'
})
export class SignupproviderComponent {
  signupObject!: ISignup;

  constructor( private toaster: ToastrService, private userService: UserService){
    this.signupObject.RoleId = 3;
  }

  onSubmit(){
    this.userService.signup(this.signupObject)
      .subscribe({
        next: (res: IResSignup) => {
          sessionStorage.setItem("name", res.firstName + " " + res.lastName);
          sessionStorage.setItem("email", res.email);
          sessionStorage.setItem("role", res.roleId.toString());
          this.toaster.success("Welcome to Helperland.");
        },
        error:(error)=>{
          this.toaster.error(error.error);
        },
      });
  }
}