import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  ValidatorFn,
  AbstractControl, 
  ValidationErrors,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { ActivatedRoute } from '@angular/router';

import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { SharedDataService } from '../../services/shared-data.service';
import { ClientModel } from 'src/app/interfaces/client';
import { AddressModel } from 'src/app/interfaces/address';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('passwordCtrl');
  const repeatPassword = control.get('repeatPasswordCtrl');

  if (!password || !repeatPassword || password.value === repeatPassword.value) {
    console.log("Ok");
    return null; // Passwords match
  } else {
    console.log("Error");
    return { passwordMismatch: true }; // Passwords don't match
  }
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule
  ],
})

export class RegisterComponent implements OnInit {

  newUser: ClientModel | undefined;
  newAddress: AddressModel | undefined;

  ngOnInit(): void {
  }

  phoneFormGroup = this._formBuilder.group({
    phoneCtrl: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    emergencyPhoneCtrl: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
  });

  accountFormGroup = this._formBuilder.group({
    emailCtrl: ['', [Validators.required, Validators.email]], //, Validators.email
    passwordCtrl: ['', [Validators.required, Validators.minLength(8)]],
    repeatPasswordCtrl: ['', [Validators.required, Validators.minLength(8)]],
  }, { validator: passwordMatchValidator });

  addressFormGroup = this._formBuilder.group({
    streetCtrl: ['', Validators.required],
    numberCtrl: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    cityCtrl: ['', Validators.required],
    stateCtrl: ['', Validators.required],
    zipCodeCtrl: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    countryCtrl: ['', Validators.required],
  });

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }


  sendPhoneData(phone: string | null | undefined, emergencyPhone: string | null | undefined) {
    if (phone && emergencyPhone) {
      this._sharedDataService.setPhones(phone, emergencyPhone);
    }
  }

  sendAccountData(email: string | null | undefined, password: string | null | undefined) {
    if (email && password) {
      this._sharedDataService.setAccount(email, password);
    }
  }

  sendAddressData(
    street: string | null | undefined,
    number: string | null | undefined,
    city: string | null | undefined,
    state: string | null | undefined,
    zipCode: string | null | undefined,
    country: string | null | undefined,
  ) {
    if (street && number && city && state && zipCode && country) {
      this._sharedDataService.newUserAddress(street, +number, city, state, +zipCode, country);
    }
  }

  onSubmitPhone() {
    if (this.phoneFormGroup.valid) {
      const formData = this.phoneFormGroup.value;
      this.sendPhoneData(formData.phoneCtrl, formData.emergencyPhoneCtrl);
    } else {
      this.openSnackBar("Error, teléfonos no validos", "Ok");
    }
  }

  onSubmitAccount() {
    if (this.accountFormGroup.valid) {
      const formData = this.accountFormGroup.value;
      const password = formData.passwordCtrl;
      const repeatedPassword = formData.repeatPasswordCtrl;
      
      if (password == repeatedPassword) {
        this.sendAccountData(formData.emailCtrl, formData.passwordCtrl);
      } else {
        this.openSnackBar("Error, contraseñas diferentes", "Ok");
      }

    } else {
      this.openSnackBar("Error, datos no validos", "Ok");
    }
  }

  onSubmitAddress() {
    console.log("Aqui");
    if (this.addressFormGroup.valid) {
      const formData = this.addressFormGroup.value;
      this.sendAddressData(formData.streetCtrl, formData.numberCtrl, formData.cityCtrl, formData.stateCtrl, formData.zipCodeCtrl, formData.countryCtrl);
    } else {
      this.openSnackBar("Error, teléfonos no validos", "Ok");
    }
  }

  constructor(private _formBuilder: FormBuilder, private _activeRoute: ActivatedRoute, private _snackBar: MatSnackBar, private _sharedDataService: SharedDataService) {
    this._sharedDataService.newClient$.subscribe((newClient) => {
      if (newClient) {
        this.newUser = newClient;
        console.log(this.newUser);
      }
    });

    this._sharedDataService.newAddress$.subscribe((newAddress) => {
      if (newAddress) {
        this.newAddress = newAddress;
        console.log(this.newAddress);
      }
    });
  }
}
