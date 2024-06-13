import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import { UserserviceService } from '../../services/userservices/userservice.service';
import { ResGetUserInterface } from '../../interfaces/user-action';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private http: HttpClient, private router: Router, private toaster:ToastrService, private userService: UserserviceService) {
    
  }
  ngOnInit(){
    this.userService.getUser()
      .subscribe({
        next: (res: ResGetUserInterface) => {
          this.toaster.success('Welcome to Helperland!!!!');
        },
        error:(error)=>{
          this.toaster.error(error);
          this.router.navigate([""]);
        },
      });
  }
}
