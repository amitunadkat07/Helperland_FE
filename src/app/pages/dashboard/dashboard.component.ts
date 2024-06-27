import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { MatDividerModule } from '@angular/material/divider';
import { SharedService } from '../../services/shared/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, MatDividerModule, RouterOutlet, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  name: string;
  subscription: Subscription;

  constructor( private sharedService: SharedService ){ }

  ngOnInit(){
      this.subscription = this.sharedService.sharedData.subscribe(data => {
        if (data == null) {
          data = sessionStorage.getItem('Name');
        }
        this.name = data;
      });
  }
}
