import { Component } from '@angular/core';
import { UserService } from '../../../../services/userservices/user.service';
import { IResGetAddress } from '../../../../interfaces/user-action';
import { LoaderComponent } from '../../../../components/loader/loader.component';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddNewAddressComponent } from '../add-new-address/add-new-address.component';
import { DeleteAddressComponent } from '../delete-address/delete-address.component';

@Component({
  selector: 'app-my-addresses',
  standalone: true,
  imports: [ LoaderComponent, MatTableModule, MatIconModule ],
  templateUrl: './my-addresses.component.html',
  styleUrl: './my-addresses.component.css'
})
export class MyAddressesComponent {
  email: string;
  loggedIn: string;
  loading = false;
  length: number;
  elements: IResGetAddress[];
  displayedColumns: string[] = ['addresses', 'action'];
  datasource: MatTableDataSource<IResGetAddress>;
  constructor( private userService: UserService, private toaster: ToastrService, private dialog: MatDialog ){
    this.email = sessionStorage.getItem('Email');
    this.loggedIn = sessionStorage.getItem('IsLoggedIn');
  }

  ngOnInit(){
    this.getAddress();
  }

  getAddress(){
    this.loading = true
    this.userService.getAddressByUser(this.email)
      .subscribe({
        next: (res: IResGetAddress[]) => {
          this.elements = res;
          this.datasource = new MatTableDataSource<IResGetAddress>(this.elements);
          this.length = res.length;
          this.loading = false;
        },
        error:(error)=>{
          if (error.error.errorMessage) {
            this.toaster.error(error.error.errorMessage);
          }
          else if (this.loggedIn == "true") {
            this.toaster.error("Error loading the addresses.");
          }
          else {
            this.toaster.error("Please login first.");
          }
          this.loading = false;
        },
      })
  }

  addNewAddress(addressId: number, isEdit: boolean){
    const referenceVar = this.dialog.open(AddNewAddressComponent, {
      width: '500px',
      height: '500px',
      data: {
          addressId: addressId,
          isEdit: isEdit
      }
    });
    referenceVar.afterClosed().subscribe(()=>{
      this.getAddress();
    })
  }

  deleteAddress(addressId: number){
    const referenceVar = this.dialog.open(DeleteAddressComponent, {
      width: '500px',
      height: '220px',
      data: addressId
    });
    referenceVar.afterClosed().subscribe(()=>{
      this.getAddress();
    })
  }
}
