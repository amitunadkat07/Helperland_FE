import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { SignupproviderComponent } from '../signupprovider/signupprovider.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LoginComponent, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private dialog: MatDialog){ }
  
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
