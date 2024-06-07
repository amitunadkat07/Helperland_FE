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
  
  openLogin():void{
    const referenceVar = this.dialog.open(LoginComponent, {
      width: '350px',
      height: '400px'
    });
    referenceVar.afterClosed().subscribe(()=>{
      console.log("Pop-up closed");
    })
  }

  openSignup():void{
    const referenceVar = this.dialog.open(SignupproviderComponent, {
      width: '400px',
<<<<<<< HEAD
=======
      height: '370px'
    });
    referenceVar.afterClosed().subscribe(()=>{
      console.log("Pop-up closed");
    })
  }

  openSignup():void{
    const referenceVar = this.dialog.open(SignupproviderComponent, {
      width: '400px',
>>>>>>> f29c2562e10792239331eee1d9b33b00b128741b
      height: '510px'
    });
    referenceVar.afterClosed().subscribe(()=>{
      console.log("Pop-up closed");
    })
  }
}
