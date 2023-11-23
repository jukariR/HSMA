import { Injectable } from '@angular/core';
import { connect } from '@planetscale/database/dist';
import { environment as env} from 'src/environments/environment';
import { Login } from '../interfaces/hotelinter';
import { HotelModel } from '../interfaces/hotel';
import { AddressModel } from '../interfaces/address';

@Injectable({
  providedIn: 'root'
})

export class CrudService {

  constructor() { }

  async getAllHotelsOfClient(clientId: number): Promise<HotelModel[]> {
    const conn = connect(env.planetScale);
    const result = await conn.execute(`SELECT * FROM hotels AS h INNER JOIN addresses AS a ON h.address_id = a.id INNER JOIN hotel_images AS i ON i.hotel_id = h.id WHERE client_id = ${clientId};`).then(res => res.rows);

    const hotels: HotelModel[] = result.map((row: any) => {
      let address = new AddressModel();
      address.id = row.address_id;
      address.street = row.street;
      address.number = row.number;
      address.city = row.city;
      address.state = row.state;
      address.zipCode = row.zip_code;
      address.country = row.country;
      address.latitude = row.latitude;
      address.longitude = row.longitude;

      return new HotelModel(row.id, row.name, row.description, row.web_site, row.phone, row.url, clientId, address);
    });

    return hotels;
  }
  
  async ComparePassword(email: string) : Promise<Login[]> {
    const conn = await connect(env.planetScale);
    const data = await conn.execute(`select email, id, password from clients where email = '${email}'`).then(res => res.rows)
    
    const res: Login[] = data.map((row: any) => ({
      email: row.email,
      id: row.id,
      password: row.password,
    }));

    return res;
  }

  async postHotel(name: string, location: number){
    const conn = await connect(env.planetScale)
    const res = await conn.execute('insert into hotel(name, location) values (?, ?)', [name, location]);
    console.log((await res).rows)
  }
}
