export interface Client {
    name: string;
    last: string;
    brith: Date;
    phone: string;
    address: Address;
    payment: Payment[];
}
export interface Guests {
    id_client: string; //id de documento en firebase
    qty_guest: number;//qty = cantidad
    dt_start : Date;
    dt_end : Date;
    reservation: Reservation; 
}

export interface Reservation {
    tot_price: string;
    adelanto: string;
    dl_date: Date;
    type: number;
}

export interface Address {
    street: string;
    number: string;
    phone: string;
    city: string; 
    state: string;
    colony: string;
    country: string;
    latitude: string;
    longitude: string;
}

export interface Payment {
    number: string; //clabe bancaria
    boucher: string;
    amount: string;
    verification: boolean;
    type: number;
}

/*export interface Reservation {
    
}*/