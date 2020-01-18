declare namespace ICmsConfigRequest {

    interface ICmsConfig {
        type: string,
        action: string,
        data: ICmsConfigData[],
    }

    interface ICmsConfigData {
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
        }
    }
}
