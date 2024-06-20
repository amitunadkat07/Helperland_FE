import { Component } from '@angular/core';
import { IResGetUser } from '../../../../interfaces/user-action';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserService } from '../../../../services/userservices/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-data',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './dashboard-data.component.html',
  styleUrl: './dashboard-data.component.css'
})
export class DashboardDataComponent {
  elements: IResGetUser[];
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'actions'];
  datasource: MatTableDataSource<IResGetUser>;
  loggedIn: string;

  constructor( private userService: UserService, private toaster: ToastrService, private router: Router ) {
    this.loggedIn = sessionStorage.getItem('IsLoggedIn');
  }

  ngOnInit(){
    this.userService.getUser()
      .subscribe({
        next: (res: IResGetUser[]) => {
          this.elements = res;
          this.datasource = new MatTableDataSource<IResGetUser>(this.elements);
        },
        error:(error)=>{
          if (this.loggedIn == "true") {
            console.log(error);
            this.toaster.error("Error Loading the dashboard.");
            sessionStorage.clear();
          }
          else {
            this.toaster.error("Please login first.");
          }
          this.router.navigate(["home"]);
        },
      });
  }
}
