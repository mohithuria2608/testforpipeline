declare namespace ISyncGrpcRequest {

    interface IFetchConfig {
        store_code: string
    }

    interface IConfig {
        id: number,
        store_code: string,
        store_id: string,
        noon_pay_config: {
            brand_code: string,
            country_code: string,
            payment_methods: [{
                id: string,
                name: string,
                order_category: string,
            }],
            code: string,
            status: string,
        },
        cod_info: {
            status: string,
            title: string,
            code: string,
        },
        free_shipping: {
            status: string,
            title: string,
            min_order_total: null,
            price: number,
            code: string
        },
        flat_rate: {
            status: string,
            title: string,
            price: number,
            code: string
        }
    }

    interface IFetchAppversion {
        type?: string,
        isActive?: number
    }
}
