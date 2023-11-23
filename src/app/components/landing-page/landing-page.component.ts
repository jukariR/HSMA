import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {Router , RouterModule} from '@angular/router';
import { 
  FormBuilder, 
  FormGroup, 
  Validators,
  AbstractControl, 
  ValidatorFn
} from '@angular/forms';

import {MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

import { SharedDataService } from '../../services/shared-data.service';

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
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatSnackBarModule, MatButtonModule, MatInputModule, ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule, RouterModule],
})
export class LandingPageComponent implements OnInit {

  startFormGroup = this._formBuilder.group({
    nameCtrl: ['', Validators.required],
    lastNameCtrl: ['', Validators.required],
    birthCtrl: ['', [Validators.required, ageValidator(18)]],
  });

  ngOnInit(): void {

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }

  sendNewUserData(name: string | null | undefined, lastName: string | null | undefined, birth: string | null | undefined) {
    if (name && lastName && birth) {
      let birthDate = new Date(birth);
      this._sharedDataService.newUserData(name, lastName, birthDate);
    }
  }

  onSubmit() {
    if (this.startFormGroup.valid) {
      const formData = this.startFormGroup.value;
      this.sendNewUserData(formData.nameCtrl, formData.lastNameCtrl, formData.birthCtrl);
      this._router.navigate(['/register']);
    } else {
      this.openSnackBar("Error, formulario no valido", "Ok");
    }
  }

  constructor(private _formBuilder: FormBuilder, private _router: Router, private _snackBar: MatSnackBar, private _sharedDataService: SharedDataService) {}
}
