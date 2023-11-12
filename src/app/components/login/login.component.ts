import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { isEmpty, timer } from 'rxjs';
import { Login } from 'src/app/interfaces/hotel';
import { CrudService } from 'src/app/services/crud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  
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
      Swal.fire({
        position: 'bottom-end',
        title: 'Error!',
        text: 'El usuario o la contraseña no existen',
        icon: 'error',
        showConfirmButton: false,
        timer: 3000
      })
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
