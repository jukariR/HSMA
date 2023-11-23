import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { isEmpty, timer } from 'rxjs';
import { Login } from 'src/app/interfaces/hotel';
import { CrudService } from 'src/app/services/crud.service';

import {
  FormGroup,
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
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, MatCardModule],
})
export class LoginComponent implements OnInit {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();
  
  width: number = 0;
  public changeClass = false;
  
  log: FormGroup = new FormGroup({
    email: new FormControl(''),
    passwd: new FormControl('')
  });

  get email() { return this.log.get('email')?.value }
  get passwd() { return this.log.get('passwd')?.value }

  constructor(private crudService: CrudService, private router: Router) {
    
  }

  ngOnInit(): void {
    this.Validate()
  }
  
  ngOnChange(){
  }
  
  async login() {
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
  }
  
  ValidateMail() {
    const regexMail : RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if(regexMail.test(this.email))
      return true
    return false
  }

  ValidatePasswd() {
    const regexPass:RegExp= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_\-\.])[A-Za-z\d@$!%*?&_\-\.]{10,}$/
    if(regexPass.test(this.passwd) || this.passwd == "password")
      return true
    return false
  }

  Validate() {
    if(!this.ValidateMail() || !this.ValidatePasswd())
      return false;
    return true
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = event.target.innerWidth;
    if(this.width < 821)
      this.changeClass = true;
    else
      this.changeClass = false;
  }
}
