import { Injectable } from '@angular/core';
import { connect } from '@planetscale/database/dist';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  config = {
    host: 'aws.connect.psdb.cloud',
    username: 'hu2gvrc7wh9hoixnkmnp',
    password: 'pscale_pw_bHDrwH3mQcthRfEpHJfN4VuQAMTol8FkbdK1xM8Ydsh'
  }

  constructor() { }

  async getAllHotels(){
    const conn = await connect(this.config)
    const res = await conn.execute('select * from hotel');
    console.log((await res).rows)
  }
  
  async postHotel(name: string, location: number){
    const conn = await connect(this.config)
    const res = await conn.execute(`insert into hotel(name, location) values (?, ?)`, [name, location]);
    console.log((await res).rows)
  }
}
