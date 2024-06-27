import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ ReactiveFormsModule, MatFormFieldModule, MatInputModule ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  paymentForm = new FormGroup({
    promo: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{6}$')])
  });
}
