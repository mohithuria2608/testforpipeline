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
        }
    }
}


