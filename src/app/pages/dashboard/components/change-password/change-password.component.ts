import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoaderComponent } from '../../../../components/loader/loader.component';
import { MatTooltip } from '@angular/material/tooltip';
import { UserService } from '../../../../services/userservices/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { IPasswordChange, IResPasswordChange } from '../../../../interfaces/user-action';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatTooltip, MatIconModule, NgIf, LoaderComponent ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  show = false;
  loading = false;
  loggedIn: string;
  passwordTooltip = false;
  changePasswordForm = new FormGroup({
    email: new FormControl('', Validators.required),
    oldPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,14}$')]),
    confirmPassword: new FormControl('', Validators.required),
  }, {
    validators: this.passwordsMatchValidator.bind(this),
  });

  constructor( private userService: UserService, private toaster: ToastrService, private router: Router ){ 
    this.loggedIn = sessionStorage.getItem('IsLoggedIn');
  }

  passwordsMatchValidator(group: FormGroup): { [key: string]: boolean } {
    const password = group.get('newPassword').value;
    const confirmPassword = group.get('confirmPassword').value;
    return password === confirmPassword ? null : { passwordsMatch: true };
  }

  pwdShowHide() {
    this.show = !this.show;
  }

  getErrorMessage(controlName: string) {
    const control = this.changePasswordForm.get(controlName);
    if (controlName == 'newPassword') {
      if (control.hasError('required')) {
        this.passwordTooltip = false;
        return `${controlName} is required`;
      }
      else if (control.hasError('pattern')) {
        this.passwordTooltip = true;
        return 'Invalid password';
      } 
      else {
        this.passwordTooltip = false
      }
    }
    else{
      if (control.hasError('required'))
        return `${controlName} is required`;
    }
    return '';
  }

  onSubmit(){
    this.loading = true;
    const changePasswordData: IPasswordChange = {
      Email: sessionStorage.getItem('Email'),
      OldPassword: this.changePasswordForm.get('oldPassword').value,
      NewPassword: this.changePasswordForm.get('newPassword').value
    }
    this.userService.updatePassword(changePasswordData)
      .subscribe({
        next: (res: IResPasswordChange) => {
          this.toaster.success("Password changed successfully!")
          this.changePasswordForm.reset();
          this.loading = false;
        },
        error:(error)=>{
          if (error.error.errorMessage) {
            this.toaster.error(error.error.errorMessage);
          }
          else if (this.loggedIn == "true") {
            this.toaster.error("Error updating the password.");
            sessionStorage.clear();
          }
          else {
            this.toaster.error("Please login first.");
          }
          this.loading = false;
        },
    })
  }
}
