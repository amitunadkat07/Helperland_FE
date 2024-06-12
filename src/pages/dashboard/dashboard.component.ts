import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private http: HttpClient, private router: Router, private toaster:ToastrService) {
    
  }
  ngOnInit(){
    this.http
      .get('https://localhost:44374/api/Helperland/GetUsers')
      .subscribe((res: any) => {
        this.toaster.success('Welcome to Helperland!!!!');
      },
    (error)=>{
      this.toaster.error(error);
      this.router.navigate([""]);
    });
  }
}
