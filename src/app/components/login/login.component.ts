import { Component, OnInit, HostListener } from '@angular/core';
import {Guests} from 'src/app/interfaces/guests';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  width: number = 0;
  public changeClass = false;
  
  constructor(private crudService: CrudService) {
    // this.firestore.collection('guests').valueChanges({ name: '', room: 0 }).subscribe((users: any) => {
    //   this.items = users;
    //   console.log("get data", this.items[0]);
    //   console.log("firebase data", users);
    // });
  }

  ngOnInit(): void {
    
  }

  info() {
    this.crudService.getAllHotels()
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
