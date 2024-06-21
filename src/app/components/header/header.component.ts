import { Component } from '@angular/core';
import { LoginComponent } from '../../pages/home/components/login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { SignupproviderComponent } from '../../pages/home/components/signup-provider/signup-provider.component';
import { NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, NgIf, MatMenuModule, MatIconModule, RouterModule, LoaderComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  loggedIn: string;
  name: string;
  loading = false;
  constructor(private dialog: MatDialog, private toaster: ToastrService, private router: Router){ 
  }

  ngOnInit() {
    this.loggedIn = sessionStorage.getItem('IsLoggedIn');
    this.name = sessionStorage.getItem('Name');
  }

  logOut(){
    this.loading = true;
    sessionStorage.clear();
    this.toaster.success('Logged out Successfully.');
    this.router.navigate(["home"]);
    this.loading = false;
  }
  
  openLogin(){
    const referenceVar = this.dialog.open(LoginComponent, {
      width: '350px',
      height: '430px'
    });
    referenceVar.afterClosed().subscribe(()=>{
    })
  }

  openSignup(){
    const referenceVar = this.dialog.open(SignupproviderComponent, {
      width: '500px',
      height: '680px'
    });
    referenceVar.afterClosed().subscribe(()=>{
    })
  }
}
