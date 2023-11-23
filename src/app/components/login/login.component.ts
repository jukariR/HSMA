import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { isEmpty, timer } from 'rxjs';
import { Login } from 'src/app/interfaces/hotel';
import { CrudService } from 'src/app/services/crud.service';

import {
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule, ReactiveFormsModule, MatCardModule],
})
export class LoginComponent implements OnInit {

  formGroup = this._formBuilder.group({
    emailCtrl: ['', [Validators.required, Validators.email]],
    passwordCtrl: ['', [Validators.required, Validators.minLength(8)]]
  });

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this._router.navigate(['/dashboard']);
    } else {
      this.openSnackBar("Error, teléfonos no validos", "Ok");
    }
  }

  ngOnInit(): void {
  }

  constructor(private _formBuilder: FormBuilder, private _router: Router, private crudService: CrudService, private _snackBar: MatSnackBar, private router: Router) {
    
  }
  
  /*async login() {
    const data = await this.crudService.ComparePassword(this.email);

    if(data.length == 0){
    }
    else{
      localStorage.setItem('id', data[0].id.toString());
      this.router.navigate(['dashboard'])
      timer(100).subscribe( x =>
        window.location.reload()
      )
      console.log(data)
    }
  }*/
}
