import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/userservices/user.service';
import { IResGetUser } from '../../interfaces/user-action';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor( private router: Router, private toaster:ToastrService, private userService: UserService) {
    
  }
  ngOnInit(){
    this.userService.getUser()
      .subscribe({
        next: (res: IResGetUser) => {
          this.toaster.success('Welcome to Helperland!!!!');
        },
        error:(error)=>{
          this.toaster.error(error);
          this.router.navigate([""]);
        },
      });
  }
}
