import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IResSignup, ISignup } from '../../../../interfaces/user-action';
import { UserService } from '../../../../services/userservices/user.service';

@Component({
  selector: 'app-signupprovider',
  standalone: true,
  imports: [MatCheckboxModule, MatDialogModule, ReactiveFormsModule, HttpClientModule, NgIf],
  templateUrl: './signup-provider.component.html',
  styleUrl: './signup-provider.component.css'
})
export class SignupproviderComponent {
  signupForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    contact: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confPassword: new FormControl('', Validators.required),
    roleId: new FormControl(3),
    privacyPolicy: new FormControl(Validators.required),
  }, {
    validators: this.passwordsMatchValidator.bind(this),
  });

  constructor( private toaster: ToastrService, private userService: UserService){
  }

  passwordsMatchValidator(group: FormGroup): { [key: string]: boolean } {
    const password = group.get('password').value;
    const confirmPassword = group.get('confPassword').value;
    return password === confirmPassword ? null : { passwordsMatch: true };
  }

  getErrorMessage(controlName: string) {
    const control = this.signupForm.get(controlName);
    if (control.hasError('required')) {
      return `This field is required`;
    } else if (control.hasError('email')) {
      return `Invalid email format`;
    }
    return '';
  }

  onSubmit(){
    const signupData: ISignup = {
      FirstName: this.signupForm.get('firstName').value,
      LastName: this.signupForm.get('lastName').value,
      Email: this.signupForm.get('email').value,
      Contact: this.signupForm.get('contact').value,
      Password: this.signupForm.get('password').value,
      ConfPassword: this.signupForm.get('confPassword').value,
      RoleId: this.signupForm.get('roleId').value
    };
    this.userService.signup(signupData)
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