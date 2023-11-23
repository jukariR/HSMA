import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';

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
  ],
})

export class RegisterComponent implements OnInit {
  ngOnInit(): void {
  }

  phoneFormGroup = this._formBuilder.group({
    phoneCtrl: ['', Validators.required],
    emergencyPhoneCtrl: ['', Validators.required],
  });

  accountFormGroup = this._formBuilder.group({
    emailCtrl: ['', Validators.required], //, Validators.email
    passwordCtrl: ['', Validators.required],
    repeatPasswordCtrl: ['', Validators.required],
  });

  addressFormGroup = this._formBuilder.group({
    streetCtrl: ['', Validators.required],
    numberCtrl: ['', Validators.required],
    cityCtrl: ['', Validators.required],
    stateCtrl: ['', Validators.required],
    zipCodeCtrl: ['', Validators.required],
    countryCtrl: ['', Validators.required],
  });


  constructor(private _formBuilder: FormBuilder) {}
}
