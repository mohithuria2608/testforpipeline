
declare namespace IAddressCMSRequest {

    interface ICmsAddress {
        addressId: string,
        firstName: string,
        lastName: string,
        password: string,
        countryId: string,
        zip: string,
        city: string,
        state: string,
        street: string,
        latitude: string,
        longitude: string,
        description: string,
        addressIs: string,
        addressType: string,
        telephone: string,
        bldgName: string,
        flatNum: string,
        addTag: string,
        sdmAddressRef: string,
        sdmStoreRef: string,
        sdmCountryRef: string,
        sdmAreaRef: string,
        sdmCityRef: string,
    }
}
