import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';

import { SharedDataService } from '../../services/shared-data.service';

import {
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
  ValidatorFn,
  AbstractControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';

import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';

import {NgForOf} from '@angular/common';
import { HotelModel } from 'src/app/interfaces/hotel';
import { CrudService } from 'src/app/services/crud.service';

export function ageValidator(minimumAge: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value) {
      const birthdate = new Date(control.value);
      const today = new Date();
      const age = today.getFullYear() - birthdate.getFullYear();

      if (age < minimumAge) {
        return { 'minAge': { requiredAge: minimumAge, actualAge: age } };
      }
    }

    return null;
  };
}

@Component({
  selector: 'app-reservation',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, ReactiveFormsModule, MatCardModule, MatTabsModule, MatGridListModule, MatCardModule, MatListModule, NgForOf, MatBottomSheetModule],
})
export class DashboardComponent implements OnInit {
  panelOpenState = false;

  hotels: HotelModel[] = [];

  hotelEdit(hotel: HotelModel) {
    this._sharedDataService.setSelectedHotel(hotel);
    this.openBottomSheet();
  }

  openBottomSheet(): void {
    this._bottomSheet.open(HotelBottomSheetComponent);
  }


  async ngOnInit() {
    let result = await this._crudService.getAllHotelsOfClient(7);

    this.hotels.push(result[0]);
    this.hotels.push(result[0]);
    this.hotels.push(result[0]);
    this.hotels.push(result[0]);
    this.hotels.push(result[0]);
    this.hotels.push(result[0]);
    this.hotels.push(result[0]);

    console.log(this.hotels);
  }

  constructor(private router: Router, private _bottomSheet: MatBottomSheet, private _sharedDataService: SharedDataService, private _crudService: CrudService) { }
}

@Component({
  selector: 'app-hotel-sheet',
  templateUrl: './hotel-bottom-sheet.html',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatDatepickerModule, MatButtonModule, ReactiveFormsModule, MatCardModule, MatTabsModule, MatGridListModule, MatCardModule, MatListModule, NgForOf, MatBottomSheetModule],
})

export class HotelBottomSheetComponent {
  selectedHotel: HotelModel | undefined;

  detailsFormGroup = this._formBuilder.group({
    nameCtrl: ['', Validators.required],
    descriptionCtrl: ['', Validators.required],
    webSiteCtrl: ['', [Validators.required, Validators.pattern(/^(ftp|http|https):\/\/[^ "]+$/)]],
    phoneCtrl: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
  });

  addressFormGroup = this._formBuilder.group({
    streetCtrl: ['', Validators.required],
    numberCtrl: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    cityCtrl: ['', Validators.required],
    stateCtrl: ['', Validators.required],
    zipCodeCtrl: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    countryCtrl: ['', Validators.required],
  });

  adminDetailsFormGroup = this._formBuilder.group({
    nameCtrl: ['', Validators.required],
    lastNameCtrl: ['', Validators.required],
    birthCtrl: ['', [Validators.required, ageValidator(18)]],
    userCtrl: ['', Validators.required],
    passwordCtrl: ['', [Validators.required, Validators.minLength(8)]],
    phoneCtrl: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    emergencyPhoneCtrl: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
  });

  adminAddressFormGroup = this._formBuilder.group({
    streetCtrl: ['', Validators.required],
    numberCtrl: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    cityCtrl: ['', Validators.required],
    stateCtrl: ['', Validators.required],
    zipCodeCtrl: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    countryCtrl: ['', Validators.required],
  });

  onUpdateDetails() {

  }

  onUpdateAddress() {

  }

  onUpdateAdminDetails() {

  }

  onUpdateAdminAddress() {

  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  constructor(private _bottomSheetRef: MatBottomSheetRef<HotelBottomSheetComponent>, private _formBuilder: FormBuilder, private _sharedDataService: SharedDataService) {
    this._sharedDataService.selectedHotel$.subscribe((selectedHotel) => {
      if (selectedHotel) {
        this.selectedHotel = selectedHotel;
        
        this.detailsFormGroup.get('nameCtrl')?.setValue(this.selectedHotel.name);
        this.detailsFormGroup.get('descriptionCtrl')?.setValue(this.selectedHotel.description);
        this.detailsFormGroup.get('webSiteCtrl')?.setValue(this.selectedHotel.webSite);
        this.detailsFormGroup.get('phoneCtrl')?.setValue(this.selectedHotel.phone);

        this.addressFormGroup.get('streetCtrl')?.setValue(this.selectedHotel.address.street ?? "");
        this.addressFormGroup.get('numberCtrl')?.setValue(this.selectedHotel.address.number?.toString() ?? "");
        this.addressFormGroup.get('cityCtrl')?.setValue(this.selectedHotel.address.city ?? "");
        this.addressFormGroup.get('stateCtrl')?.setValue(this.selectedHotel.address.state ?? "");
        this.addressFormGroup.get('zipCodeCtrl')?.setValue(this.selectedHotel.address.zipCode?.toString() ?? "");
        this.addressFormGroup.get('countryCtrl')?.setValue(this.selectedHotel.address.country ?? "");
      }
    });
  }
}
