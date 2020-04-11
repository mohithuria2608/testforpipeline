declare namespace NodeJS {

    export interface Global {
        healthcheck: {
            as?: boolean,
            sdm?: boolean,
        },
       configSync: {
            general?: number,
            kafka?: number,
            orderStatus?: number,
            payment?: number,
            shipment?: number,
            countrySpecific?: number
        }
    }
}


