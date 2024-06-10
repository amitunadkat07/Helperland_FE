import { NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resetpass',
  standalone: true,
  imports: [FormsModule, NgIf, HttpClientModule],
  templateUrl: './resetpass.component.html',
  styleUrl: './resetpass.component.css'
})
export class ResetpassComponent {
  urlObject: UrlCheck;
  resetObject: ResetPass;

  toaster = inject(ToastrService);

  constructor(private http: HttpClient, private routes: ActivatedRoute, private router: Router) {
    this.urlObject = new UrlCheck();
    this.resetObject = new ResetPass();

    this.routes.queryParams.subscribe(params => {
      this.urlObject.ResetKey = params['t'];
      this.urlObject.Email = params['e'];
      this.resetObject.Email = params['e'];
    });

    this.http
      .post('https://localhost:44374/api/Helperland/ResetPassLink', this.urlObject)
      .subscribe((res: any) => {
        this.toaster.success('You can change your password, but please remember to follow security guidelines...');
      },
    (error)=>{
      this.toaster.error(error.error.errorMessage);
      this.router.navigate([""]);
    });
  }

  onSubmit(): void {
    this.http
      .post('https://localhost:44374/api/Helperland/ResetPass', this.resetObject)
      .subscribe((res: any) => {
          this.toaster.success('Password changed successfully...');
          this.router.navigate([""]);
      },
    (error)=>{
      this.toaster.error(error.error.errorMessage);
    });
  }
}

export class UrlCheck {
  Email: string;
  ResetKey: string;
  constructor() {
    this.Email = '';
    this.ResetKey = '';
  }
}

export class ResetPass {
  Email: string;
  Password: string;
  constructor() {
    this.Email = '';
    this.Password = '';
  }
}
