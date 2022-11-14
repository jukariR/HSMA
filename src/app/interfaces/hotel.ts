import { Address, Guests } from "./guests";

export interface Hotel {
    name: string;
    address: Address[];
    rooms: Rooms[];
    packages: Package[];
}

export interface Rooms {
    number: string;
    type: number;
    price: string;
    capacity: number;
    guest: Guests;
}

export interface Package {
    number: string;
    description: string;
    price: string;
    types: string[];
    qty_rooms: number[];
    activities: Activity[];
}

export interface Activity {
    number: string;
    description: string;
    price: string;
    dt_start: Date;
    dt_end: Date;
    dur_time: Long;
}

export interface Staff {
    name: string;
    last: string;
    birth: Date;
    phone: string;
    emerg_phone: string;
    role: number;
    address: Address;
}
/*
export interface Hotel {

}
*/