import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { LoginComponent } from '../login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IResSignup, ISignup } from '../../../../interfaces/user-action';
import { UserService } from '../../../../services/userservices/user.service';

@Component({
  selector: 'app-signupcustomer',
  standalone: true,
  imports: [MatDialogModule, MatCheckboxModule, ReactiveFormsModule, HttpClientModule, NgIf, RouterModule],
  templateUrl: './signup-customer.component.html',
  styleUrl: './signup-customer.component.css'
})
export class SignupcustomerComponent {
  signupForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    contact: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,14}$')]),
    confirmPassword: new FormControl('', Validators.required),
    roleId: new FormControl(2),
    privacyPolicy: new FormControl('', Validators.requiredTrue),
  }, {
    validators: this.passwordsMatchValidator.bind(this),
  });

  constructor( private dialog: MatDialog, private router: Router, private toaster: ToastrService, private userService: UserService){
  }

  passwordsMatchValidator(group: FormGroup): { [key: string]: boolean } {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
    return password === confirmPassword ? null : { passwordsMatch: true };
  }

  getErrorMessage(controlName: string) {
    const control = this.signupForm.get(controlName);
    if (control.hasError('required'))
      return `${controlName} is required`;
    else if (control.hasError('email'))
      return `Invalid email format`;
    if (controlName == 'contact') {
      if (control.hasError('pattern'))
      return 'Invalid contact';
    }  
    if (controlName == 'password') {
      if (control.hasError('pattern'))
        return 'Invalid password';
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
          sessionStorage.setItem("Token", res.token);
          this.toaster.success("Welcome to Helperland.");
          this.router.navigate(['dashboard']);
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

  openLogin(){
    const referenceVar = this.dialog.open(LoginComponent, {
      width: '350px',
      height: '430px'
    });
    referenceVar.afterClosed().subscribe(()=>{
      console.log("Pop-up closed");
    })
  }
}