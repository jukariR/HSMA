import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Guests } from '../interfaces/guests';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private firestore: AngularFirestore) { }

  getGuests(items: Guests[]) {
    this.firestore.collection('guests').valueChanges({ name: '', room: 0 }).subscribe((users: any) => {
      items = users;
      console.log("get data", items[0]);
      console.log("firebase data", users);
    });
  }

}
