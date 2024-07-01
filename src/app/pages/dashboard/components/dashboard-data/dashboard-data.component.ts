import { Component } from '@angular/core';
import { IResGetUser, IResponse } from '../../../../interfaces/user-action';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserService } from '../../../../services/userservices/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoaderComponent } from '../../../../components/loader/loader.component';

@Component({
  selector: 'app-dashboard-data',
  standalone: true,
  imports: [MatTableModule, LoaderComponent],
  templateUrl: './dashboard-data.component.html',
  styleUrl: './dashboard-data.component.css'
})
export class DashboardDataComponent {
  elements: IResGetUser[];
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'actions'];
  datasource: MatTableDataSource<IResGetUser>;
  loggedIn: string;
  loading = false;

  constructor( private userService: UserService, private toaster: ToastrService, private router: Router ) {
    this.loggedIn = sessionStorage.getItem('IsLoggedIn');
  }

  ngOnInit(){
    this.getUser();
  }

  getUser(){
    this.loading = true;
    this.userService.getUser()
      .subscribe({
        next: (res: IResponse<IResGetUser[]>) => {
          if (res.isSuccess) {
            this.elements = res.data;
            this.datasource = new MatTableDataSource<IResGetUser>(this.elements);
          }
          else {
            this.toaster.error(res.message);
          }
          this.loading = false;
        },
        error:(error)=>{
          console.log(error);
          if (this.loggedIn == "true") {
            this.toaster.error("Error Loading the dashboard.");
            sessionStorage.clear();
          }
          else {
            this.toaster.error("Internal server error.");
          }
          this.router.navigate(["home"]);
          this.loading = false;
        },
      });
  }
}
