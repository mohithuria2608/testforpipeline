declare namespace ICmsConfigRequest {

    interface ICmsConfig {
        type: string,
        action: string,
        data: ICmsConfigData[],
    }

    interface ICmsConfigData {
        id: number,
        store_code: string,
        /**
         * @description : payment config
         */
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
        /**
        * @description : shipment config
        */
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
        },

        /**
        * @description : country specific config
        */
        country_code: string,
        country_name: string
        concept_id: number,
        sdm_url: string,
        base_currency: string,
        licence: string,
        brand_kfc: string,
        ccode: string,
        language_en: string,
        language_ar: string,
        menus: [{
            menu_id: number,
            menu_name: string,
            channel: string,
            template_id: number,
        }]
    }
}
