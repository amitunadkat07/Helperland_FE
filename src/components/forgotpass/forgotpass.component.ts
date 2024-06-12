import { NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginComponent } from '../login/login.component';
import { ForgotPassInterface } from '../../interfaces/user-action';

@Component({
  selector: 'app-forgotpass',
  standalone: true,
  imports: [FormsModule, HttpClientModule, MatDialogModule, NgIf],
  templateUrl: './forgotpass.component.html',
  styleUrl: './forgotpass.component.css'
})
export class ForgotpassComponent {
  forgotpassObject: ForgotPassInterface = {
    Email: ''
  }

  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router, private toaster: ToastrService) {
  }

  onSubmit(){
    this.http
      .post('https://localhost:44374/api/Helperland/ForgotPass', this.forgotpassObject)
      .subscribe((res: any) => {
          this.toaster.success('Link to reset the password is sent...');
          this.router.navigate(["home"]);
      },
    (error)=>{
      this.toaster.error(error.error.errorMessage);
    });
  }

  openLogin(){
    const referenceVar = this.dialog.open(LoginComponent, {
      width: '350px',
      height: '400px'
    });
    referenceVar.afterClosed().subscribe(()=>{
      console.log("Pop-up closed");
    })
  }
}