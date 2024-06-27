import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { LoaderComponent } from '../../../../components/loader/loader.component';
import { UserService } from '../../../../services/userservices/user.service';
import { IGetProfile, IResGetProfile } from '../../../../interfaces/user-action';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { SharedService } from '../../../../services/shared/shared.service';

@Component({
  selector: 'app-my-details',
  standalone: true,
  imports: [ ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, LoaderComponent, MatSelectModule, MatIconModule, MatTooltip, NgIf ],
  templateUrl: './my-details.component.html',
  styleUrl: './my-details.component.css'
})
export class MyDetailsComponent {
  loading = false;
  contactTooltip = false;
  loggedIn: string;
  email: string;
  minDate: Date;
  maxDate: Date;
  name: string;
  profileForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    contact: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    dateOfBirth: new FormControl(new Date(), Validators.required),
    language: new FormControl('', Validators.required)
  });

  constructor( private userService: UserService, private sharedService: SharedService, private toaster: ToastrService, private router: Router ){ 
    this.loggedIn = sessionStorage.getItem('IsLoggedIn');
    this.email = sessionStorage.getItem('Email');
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 60, 0, 1);
    this.maxDate = new Date(currentYear - 20, 0, 1);
  }

  ngOnInit(){
    this.getProfile();
  }

  getErrorMessage(controlName: string, displayName: string) {
    const control = this.profileForm.get(controlName);
    if (controlName == 'contact') {
      if (control.hasError('required')) {
        this.contactTooltip = false;
        return `${displayName} is required`;
      }
      else if (control.hasError('pattern')) {
        this.contactTooltip = true;
        return 'Invalid contact';
      }
      else {
        this.contactTooltip = false
      }
    }
    else{
      if (control.hasError('required'))
        return `${displayName} is required`;
    }
    return '';
  }

  getProfile(){
    this.loading = true;
    this.userService.getProfile(this.email)
      .subscribe({
        next: (res: IResGetProfile) => {
          const { firstName, lastName, email, contact, dateOfBirth, language } = res;
          this.profileForm.patchValue({
            firstName,
            lastName,
            email,
            contact,
            dateOfBirth,
            language
          })
          this.loading = false;
        },
        error:(error)=>{
          if (error.error.errorMessage) {
            this.toaster.error(error.error.errorMessage);
          }
          else if (this.loggedIn == "true") {
            this.toaster.error("Error Loading the profile.");
            sessionStorage.clear();
          }
          else {
            this.toaster.error("Please login first.");
          }
          this.router.navigate(["home"]);
          this.loading = false;
        },
      });
  }

  onSubmit(){
    this.loading = true;
    const profileData: IGetProfile = {
      firstName: this.profileForm.get('firstName').value,
      lastName: this.profileForm.get('lastName').value,
      contact: this.profileForm.get('contact').value,
      language: this.profileForm.get('language').value,
      dateOfBirth: this.profileForm.get('dateOfBirth').value,
      email: this.profileForm.get('email').value,
    }
    this.userService.updateProfile(profileData)
      .subscribe({
        next: (res: IResGetProfile) => {
          this.toaster.success("Detail updated successfully!")
          this.name = res.firstName + " " + res.lastName;
          sessionStorage.setItem("Name", this.name);
          this.sharedService.setSharedData(this.name);
          this.getProfile();
          this.loading = false;
        },
        error:(error)=>{
          if (error.error.errorMessage) {
            this.toaster.error(error.error.errorMessage);
          }
          else if (this.loggedIn == "true") {
            this.toaster.error("Error updating the profile.");
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
