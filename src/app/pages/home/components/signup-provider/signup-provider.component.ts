import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IResSignup, ISignup } from '../../../../interfaces/user-action';
import { UserService } from '../../../../services/userservices/user.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-signupprovider',
  standalone: true,
  imports: [MatCheckboxModule, MatDialogModule, ReactiveFormsModule, HttpClientModule, NgIf, RouterModule, MatIconModule],
  templateUrl: './signup-provider.component.html',
  styleUrl: './signup-provider.component.css'
})
export class SignupproviderComponent {
  contactTooltip: boolean = false;
  passwordTooltip: boolean = false;
  signupForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    contact: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,14}$')]),
    confirmPassword: new FormControl('', Validators.required),
    roleId: new FormControl(3),
    privacyPolicy: new FormControl('', Validators.requiredTrue),
  }, {
    validators: this.passwordsMatchValidator.bind(this),
  });

  constructor( private toaster: ToastrService, private userService: UserService){
  }

  passwordsMatchValidator(group: FormGroup): { [key: string]: boolean } {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
    return password === confirmPassword ? null : { passwordsMatch: true };
  }

  getErrorMessage(controlName: string) {
    const control = this.signupForm.get(controlName);
    if (controlName == 'contact') {
      if (control.hasError('required')) {
        this.contactTooltip = false;
        return `${controlName} is required`;
      }
      else if (control.hasError('pattern')) {
        this.contactTooltip = true;
        return 'Invalid contact';
      }
    }  
    else if (controlName == 'password') {
      if (control.hasError('required')) {
        this.passwordTooltip = false;
        return `${controlName} is required`;
      }
      else if (control.hasError('pattern')) {
        this.passwordTooltip = true;
        return 'Invalid password';
      } 
    }
    else {
      if (control.hasError('required'))
        return `${controlName} is required`;
      else if (control.hasError('email'))
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
      ConfPassword: this.signupForm.get('confirmPassword').value,
      RoleId: this.signupForm.get('roleId').value
    };
    this.userService.signup(signupData)
      .subscribe({
        next: (res: IResSignup) => {
          sessionStorage.setItem("name", res.firstName + " " + res.lastName);
          sessionStorage.setItem("email", res.email);
          sessionStorage.setItem("role", res.roleId.toString());
          this.toaster.info("Once the admin will approve you can login to the portal.", null, { timeOut: 8000 });
          this.toaster.success("Service Provider registered.");
        },
        error:(error)=>{
          if (error.error.type == "error") {
            console.log("Internal Server Error.");
            this.toaster.error("Internal Server Error.");
          }
          else{
            console.log(error.error);
            this.toaster.error(error.error);
          }
        },
      });
  }
}