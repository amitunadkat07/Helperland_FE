import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookingService } from '../../../../services/bookingservices/booking.service';
import { IResponse } from '../../../../interfaces/user-action';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-setup-service',
  standalone: true,
  imports: [ ReactiveFormsModule, MatFormFieldModule, MatInputModule, NgIf ],
  templateUrl: './setup-service.component.html',
  styleUrl: './setup-service.component.css'
})
export class SetupServiceComponent {
  @Output() messageEvent = new EventEmitter();
  errorMessage: string;
  zipCodeCheckForm = new FormGroup({
    zipCode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{6}$')])
  });

  constructor( private bookingService: BookingService ) {  }

  getErrorMessage(controlName: string, displayName: string) {
    const control = this.zipCodeCheckForm.get(controlName);
    if (control.hasError('required')) {
      return `${displayName} is required`;
    }
    else if (control.hasError('pattern')) {
      return 'Invalid ZipCode';
    } 
    else {
      return '';
    }
  }

  onSubmit() {
    this.bookingService.zipCodeCheck(this.zipCodeCheckForm.get('zipCode').value)
      .subscribe({
        next: (res: IResponse<boolean>) => {
          if (res.isSuccess) {
            this.messageEvent.emit(res.message);
          }
          else {
            this.errorMessage = "We are not providing service in this area.";
          }
        },
        error:(error)=>{
          this.errorMessage = "Internal server error."
        },
      });
  }
}
