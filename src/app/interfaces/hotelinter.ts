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

export interface Login {
    email: string,
    id: number,
    password: string
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