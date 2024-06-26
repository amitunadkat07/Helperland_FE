import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { LoaderComponent } from '../../../../components/loader/loader.component';
import { UserService } from '../../../../services/userservices/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-address',
  standalone: true,
  imports: [ MatDialogModule, LoaderComponent ],
  templateUrl: './delete-address.component.html',
  styleUrl: './delete-address.component.css'
})
export class DeleteAddressComponent {
  loading = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: number, private toaster: ToastrService, private userService: UserService, private dialogRef: MatDialogRef<DeleteAddressComponent>){
  }

  deleteAddress(){
    this.loading = true;
    this.userService.deleteAddress(this.data)
      .subscribe({
        next: (res: any) => {
          this.toaster.success("Address deleted successfully.");
          this.loading = false;
          this.dialogRef.close();
        },
        error:(error)=>{
          if (error.error.type == "error") {
            this.toaster.error("Internal Server Error.");
          }
          this.dialogRef.close();
          this.loading = false;
        },
      });
  }
}
