import { Injectable } from '@angular/core';
import { connect } from '@planetscale/database/dist';
import { environment as env} from 'src/environments/environment';
import { Login } from '../interfaces/hotel';

@Injectable({
  providedIn: 'root'
})

export class CrudService {

  constructor() { }

  async getAllHotels(){
    const conn = await connect(env.planetScale)
    const res = await conn.execute('select * from hotel');
    console.log((await res).rows)
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
