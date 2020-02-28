
declare namespace IAddressCMSRequest {

    interface IHeader { }

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

    interface ICreateAddress {
        customerId: number,
        websiteId: number,
        address: IAddress[]
    }

    interface IAddress {
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

    interface IUpdateAddress {
        customerId: string,
        addressId: string,
        websiteId: string,
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

    interface IDeleteAddress {
        cmsUserRef: number,
        cmsAddressRef: number
    }

    interface IDeleteAddressReq {
        customerId: string,
        addressId: string,
        websiteId: string,
    }
}
