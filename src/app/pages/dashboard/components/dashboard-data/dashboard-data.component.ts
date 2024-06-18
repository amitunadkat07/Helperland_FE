import { Component } from '@angular/core';
import { IResGetUser } from '../../../../interfaces/user-action';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserService } from '../../../../services/userservices/user.service';

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

  constructor( private userService: UserService) {
    
  }

  ngOnInit(){
    this.userService.getUser()
      .subscribe({
        next: (res: IResGetUser[]) => {
          this.elements = res;
          this.datasource = new MatTableDataSource<IResGetUser>(this.elements);
        },
        error:(error)=>{
          console.log(error);
        },
      });
  }
}
