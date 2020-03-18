declare namespace ISyncGrpcRequest {

    interface IConfig {
        type: string,
        id: number,

        store_code?: string,

        general?: IGeneral
        kafka?: IKafka
        orderStatus?: IOrderStatus
        payment?: IPayment
        shipping?: IShipping
        countrySpecific?: ICountrySpecific,

        createdAt: number
    }

    interface IGeneral {
        cms_page_data: [{
            title: string,
            identifier: string,
        }],
        ttl_for_cart: number,
        initial_user_ttl: number,
        initial_guest_ttl: number,
        bypass_otp: number,
        otp_expire: number,
        access_token_expire_time: number,
        refresh_token_expire_time: number,
        cms_auth_exp: number,
        reg_ex_for_validation: string,
        country_codes: string,
        support: string,
        customer_care_email: string,
        user_change_ttl: number,
        max_pending_state: number,
        minimum_cart_price: number,
        payment_api_timeout: number,
        payment_api_key_prefix: string,
        display_color: boolean,
        deeplink_fallback: string,
        auth_mech: string,
        addr_show_time: number,
    }
    interface IKafka {
        sdm: {
            user_config: {
                max_try: IMaxRetry
            },
            address_config: {
                max_try: IMaxRetry
            },
            menu_config: {
                max_try: IMaxRetry
            },
            promotion_config: {
                max_try: IMaxRetry
            },
            hidden_config: {
                max_try: IMaxRetry
            },
            order_config: {
                max_try: IMaxRetry
            }
        },
        cms: {
            user_config: {
                max_try: IMaxRetry
            },
            address_config: {
                max_try: IMaxRetry
            },
            menu_config: {
                max_try: IMaxRetry
            },
            promotion_config: {
                max_try: IMaxRetry
            },
            hidden_config: {
                max_try: IMaxRetry
            },
            order_config: {
                max_try: IMaxRetry
            }
        },
        as: {
            user_config: {
                max_try: IMaxRetry
            },
            address_config: {
                max_try: IMaxRetry
            },
            menu_config: {
                max_try: IMaxRetry
            },
            promotion_config: {
                max_try: IMaxRetry
            },
            hidden_config: {
                max_try: IMaxRetry
            },
            configuration_config: {
                max_try: IMaxRetry
            },
            app_config: {
                max_try: IMaxRetry
            }
        }
    }

    interface IMaxRetry {
        create: number,
        update: number,
        get: number,
        sync: number,
        reset: number
    }

    interface IOrderStatus {
        cart_config: IStatus,
        pending_config: IStatus,
        confirmed_config: IStatus,
        prepared_config: IStatus,
        ready_config: IStatus,
        ontheway_config: IStatus,
        delivered_config: IStatus,
        closed_config: IStatus,
        cancelled_config: IStatus,
        failure_config: IStatus
    }
    interface IStatus {
        as: string,
        mongo: string,
        cms: string,
        sdm: number[],
        freq: {
            get: number,
            geet_once: number,
            get_max: number,
            next_ping: number
        }
    }

    interface IPayment {
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

    interface IShipping {
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

    interface ICountrySpecific {
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

    interface IFetchConfig {
        type?: string,
        store_code?: string
    }

    interface IFetchAppversion {
        type?: string,
        isActive: number,
        deviceType?: string
    }

    interface IAppversion {
        id: string,
        type: string,
        deviceType: string,
        appversion: string,
        isActive: number,
        createdAt: number,
        updatedAt: number

    }
}
