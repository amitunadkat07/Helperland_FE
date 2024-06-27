import { Component } from '@angular/core';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { SetupServiceComponent } from './components/setup-service/setup-service.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { YourDetailsComponent } from './components/your-details/your-details.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentSummaryComponent } from './components/payment-summary/payment-summary.component';

@Component({
  selector: 'app-book-service',
  standalone: true,
  imports: [ MatStepperModule, HeaderComponent, SetupServiceComponent, ScheduleComponent, YourDetailsComponent, PaymentComponent, PaymentSummaryComponent ],
  templateUrl: './book-service.component.html',
  styleUrl: './book-service.component.css'
})
export class BookServiceComponent {
  // @ViewChild('firstStep')  setupServiceComponent: SetupServiceComponent

  receiveMessage($event: string, stepper: MatStepper) {
    if ($event == "success") {
      stepper.next();
    }
  }
}
