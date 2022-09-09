import { Component, OnInit, HostListener } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import Guests from 'src/app/interfaces/guests';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  items: Guests[];
  width: number = 0;
  public changeClass = false;
  
  constructor(private firestore: AngularFirestore) {
    this.items = [];
    this.firestore.collection('guests').valueChanges({ name: '', room: 0 }).subscribe((users: any) => {
      this.items = users;
      console.log("get data", this.items[0].name);
      console.log("firebase data", users);
    });
  }

  ngOnInit(): void {
  }

  async info(){
    // this.items = await this.firestore.collection('guests').valueChanges();
    // console.log(this.items);
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
