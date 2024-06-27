import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { AddNewAddressComponent } from '../../../dashboard/components/add-new-address/add-new-address.component';
import { IResGetAddress } from '../../../../interfaces/user-action';
import { UserService } from '../../../../services/userservices/user.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-your-details',
  standalone: true,
  imports: [ ReactiveFormsModule, MatCardModule, MatRadioModule ],
  templateUrl: './your-details.component.html',
  styleUrl: './your-details.component.css'
})
export class YourDetailsComponent {
  email: string;
  elements: IResGetAddress[];
  loading = false;

  constructor( private userService: UserService, private toaster: ToastrService, private dialog: MatDialog ){
    this.email = sessionStorage.getItem('Email');
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
          console.log(this.elements);
          this.loading = false;
        },
        error:(error)=>{
          if (error.error.errorMessage) {
            this.toaster.error(error.error.errorMessage);
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
}
