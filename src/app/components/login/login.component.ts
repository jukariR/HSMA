import { Component, OnInit, HostListener } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  items: Observable<any[]>;
  width: number = 0;
  public changeClass = false;
  
  constructor(private firestore: AngularFirestore) {
    this.items = this.firestore.collection('guests').valueChanges();
    console.log(this.items);
  }

  ngOnInit(): void {
  }

  async info(){
    this.items = await this.firestore.collection('guests').valueChanges();
    console.log(this.items);
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
