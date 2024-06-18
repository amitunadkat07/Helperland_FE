import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, MatDividerModule, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  name: string;

  constructor( private router: Router) {
    
  }
  ngOnInit(){
      this.name = sessionStorage.getItem('Name');
  }

  goTo(url: string){
    this.router.navigateByUrl(url);
  }
}
