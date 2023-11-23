import { AddressModel } from "./address"

export class HotelModel {
    id: number
    name: string
    description: string
    webSite: string
    phone: string
    url: string
    clientId: number
    address: AddressModel
    
    constructor(id: number, name: string, description: string, webSite: string, phone: string, url: string, clientId: number, address: AddressModel) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.webSite = webSite;
        this.phone = phone;
        this.url = url;
        this.clientId = clientId;
        this.address = address;
    }
}