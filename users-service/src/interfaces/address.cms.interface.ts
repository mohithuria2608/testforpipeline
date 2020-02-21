
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
        telephone: string,
        bldg_name: string,
        flat_num: string,
        add_tag: string,
        sdm_address_ref: string,
        sdm_store_ref: string,
        sdm_country_ref: string,
        sdm_area_ref: string,
        sdm_city_ref: string,
    }

    interface IUpdateAddress {

    }

    interface ICmsAddress {
        id: number,
        firstname: string,
        lastname: string,
        password: string,
        country_id: string,
        zip: string,
        city: string,
        state: string,
        street: string,
        latitude: string,
        longitude: string,
        description: string,
        address_is: string,
        address_type: string,
        telephone: string,
        bldg_name: string,
        flat_num: string,
        add_tag: string,
        sdm_address_ref: string,
        sdm_store_ref: string,
        sdm_country_ref: string,
        sdm_area_ref: string,
        sdm_city_ref: string,
    }
}
