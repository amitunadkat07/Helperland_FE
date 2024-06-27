import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [ MatDatepickerModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, MatCheckboxModule, ReactiveFormsModule ],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent {
  scheduleForm = new FormGroup({
    dateOfService: new FormControl(new Date(), Validators.required),
    comments: new FormControl(''),
    pets: new FormControl(false),
  });
}
