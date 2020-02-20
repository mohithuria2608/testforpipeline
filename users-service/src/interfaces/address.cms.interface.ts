
declare namespace IAddressCMSRequest {

    interface IHeader { }

    interface ICreateAddress {
        customerId: number,
        websiteId: number,
        address: IAddress[]
    }

    interface IAddress {
        id: 2,
        firstname: string,
        lastname: string,
        password: string,
        country_id: string,
        zip: string,
        city: string,
        state: string,
        street: string,
        latitude: number,
        longitude: number,
        description: string,
        address_is: number,
        address_type: string,
        telephone: string
    }
    
    interface IUpdateAddress {

    }
}
