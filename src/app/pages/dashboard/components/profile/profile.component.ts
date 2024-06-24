import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MyAddressesComponent } from '../my-addresses/my-addresses.component';
import { MyDetailsComponent } from '../my-details/my-details.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ MatTabsModule, MyAddressesComponent, MyDetailsComponent, ChangePasswordComponent ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
