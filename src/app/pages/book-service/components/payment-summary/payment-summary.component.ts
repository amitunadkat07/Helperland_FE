import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-payment-summary',
  standalone: true,
  imports: [ MatCardModule ],
  templateUrl: './payment-summary.component.html',
  styleUrl: './payment-summary.component.css'
})
export class PaymentSummaryComponent {

}
