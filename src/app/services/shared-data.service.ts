import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ClientModel } from '../interfaces/client';
import { AddressModel } from '../interfaces/address';
import { HotelModel } from '../interfaces/hotel';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private dataSubject = new BehaviorSubject<any>(null);
  public data$ = this.dataSubject.asObservable();

  private newClient = new BehaviorSubject<ClientModel | null>(null);
  public newClient$ = this.newClient.asObservable();

  private newAddress = new BehaviorSubject<AddressModel | null>(null);
  public newAddress$ = this.newAddress.asObservable();

  private selectedHotel = new BehaviorSubject<HotelModel | null>(null);
  public selectedHotel$ = this.selectedHotel.asObservable();

  updateData(data: any) {
    this.dataSubject.next(data);
  }

  newUserData(name: string, lastName: string, birth: Date) {
    let client = new ClientModel()
    client.name = name;
    client.lastName = lastName;
    client.birth = birth;
    this.newClient.next(client);
  }

  setPhones(phone: string, emergencyPhone: string) {
    let client = this.newClient.value;

    if (client) {
        client.phone = phone;
        client.emergencyPhone = emergencyPhone;
        this.newClient.next(client);
    }
  }

  setAccount(email: string, password: string) {
    let client = this.newClient.value;

    if (client) {
        client.email = email;
        client.password = password;
        this.newClient.next(client);
    }
  }

  newUserAddress(
    street: string,
    number: number,
    city: string,
    state: string,
    zipCode: number,
    country: string,
  ) {
    let address = new AddressModel()
    address.street = street;
    address.number = number;
    address.city = city;
    address.state = state;
    address.zipCode = zipCode;
    address.country = country;
    this.newAddress.next(address);
  }

  setSelectedHotel(hotel: HotelModel) {
    this.selectedHotel.next(hotel);
  }
}