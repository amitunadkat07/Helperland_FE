import { HttpClientModule } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { LoaderComponent } from '../../../../components/loader/loader.component';
import { MatTooltip } from '@angular/material/tooltip';
import { UserService } from '../../../../services/userservices/user.service';
import { ToastrService } from 'ngx-toastr';
import { IAddress, IError, IOperationType, IResGetAddress } from '../../../../interfaces/user-action';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-new-address',
  standalone: true,
  imports: [ ReactiveFormsModule, HttpClientModule, MatDialogModule, MatTooltip, MatIconModule, NgIf, LoaderComponent ],
  templateUrl: './add-new-address.component.html',
  styleUrl: './add-new-address.component.css'
})
export class AddNewAddressComponent {
  contactTooltip = false;
  zipCodeTooltip = false;
  loading = false;
  addAddressForm = new FormGroup({
    addressId: new FormControl(0),
    email: new FormControl(sessionStorage.getItem('Email'), Validators.required),
    contact: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    street: new FormControl('', Validators.required),
    house: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    zipCode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{6}$')])
  });

  constructor( @Inject(MAT_DIALOG_DATA) public data: IOperationType, private toaster: ToastrService, private userService: UserService, private dialogRef: MatDialogRef<AddNewAddressComponent> ){
  }

  ngOnInit(){
    if (this.data.isEdit) {
      this.loading = true;
      this.userService.getAddressById(this.data.addressId)
        .subscribe({
          next: (res: IResGetAddress) => {
            const { addressId, street, house, city, zipCode, contact } = res;
            this.addAddressForm.patchValue({
              addressId,
              street,
              house,
              city,
              zipCode,
              contact
            })
            this.loading = false;
          },
          error:(error)=>{
            if (error.error.type == "error") {
              this.toaster.error("Internal Server Error.");
            }
            else{
              this.toaster.error(error.error.errorMessage);
            }
            this.loading = false;
          },
        });
    }
  }

  getErrorMessage(controlName: string, displayName: string) {
    const control = this.addAddressForm.get(controlName);
    if (controlName == 'contact') {
      if (control.hasError('required')) {
        this.contactTooltip = false;
        return `${displayName} is required`;
      }
      else if (control.hasError('pattern')) {
        this.contactTooltip = true;
        return 'Invalid contact';
      }
      else {
        this.contactTooltip = false
      }
    }  
    else if (controlName == 'zipCode') {
      if (control.hasError('required')) {
        this.zipCodeTooltip = false;
        return `${displayName} is required`;
      }
      else if (control.hasError('pattern')) {
        this.zipCodeTooltip = true;
        return 'Invalid zipCode';
      } 
      else {
        this.zipCodeTooltip = false
      }
    }
    else{
      if (control.hasError('required'))
        return `${displayName} is required`;
    }
    return '';
  }

  onSubmit(){
    this.loading = true;
    const addressData: IAddress = {
      AddressId: this.data.addressId,
      Email: sessionStorage.getItem('Email'),
      Contact: this.addAddressForm.get('contact').value,
      Street: this.addAddressForm.get('street').value,
      House: this.addAddressForm.get('house').value,
      City: this.addAddressForm.get('city').value,
      ZipCode: this.addAddressForm.get('zipCode').value
    };
    if (!this.data.isEdit) {
      this.userService.addAddress(addressData)
        .subscribe({
          next: (res: IError) => {
            this.toaster.success("Address added successfully.");
            this.dialogRef.close();
            this.loading = false;
          },
          error:(error)=>{
            if (error.error.type == "error") {
              this.toaster.error("Internal Server Error.");
            }
            else{
              this.toaster.error(error.error.errorMessage);
            }
            this.dialogRef.close();
            this.loading = false;
          },
        });
    }
    else{
      this.userService.editAddress(addressData)
        .subscribe({
          next: (res: IError) => {
            this.toaster.success("Address changed successfully.");
            this.dialogRef.close();
            this.loading = false;
          },
          error:(error)=>{
            if (error.error.type == "error") {
              this.toaster.error("Internal Server Error.");
            }
            else{
              this.toaster.error(error.error.errorMessage);
            }
            this.dialogRef.close();
            this.loading = false;
          },
        });
    }
  }
}
