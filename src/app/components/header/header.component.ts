import { Component } from '@angular/core';
import { LoginComponent } from '../../pages/home/components/login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { SignupproviderComponent } from '../../pages/home/components/signup-provider/signup-provider.component';
import { NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  loggedIn: string;
  name: string;
  visibleProfile: boolean = false;
  constructor(private dialog: MatDialog, private toaster: ToastrService, private router: Router){ 
  }

  ngOnInit() {
    this.loggedIn = sessionStorage.getItem('IsLoggedIn');
    this.name = sessionStorage.getItem('Name');
  }

  openProfile(){
    this.visibleProfile = !this.visibleProfile;
  }

  logOut(){
    sessionStorage.clear();
    this.toaster.success('Logged out Successfully.');
    this.router.navigate(["home"]);
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

  openSignup(){
    const referenceVar = this.dialog.open(SignupproviderComponent, {
      width: '370px',
      height: '680px'
    });
    referenceVar.afterClosed().subscribe(()=>{
      console.log("Pop-up closed");
    })
  }
}
