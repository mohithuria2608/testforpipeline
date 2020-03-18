declare namespace ICmsConfigRequest {

    interface ICmsConfig {
        type: string,
        action: string,
        data: ICmsConfigData[],
    }

    interface ICmsConfigData {
        type: string,
        id: number,

        cms_page_data: [{
            title: string,
            identifier: string,
        }],
        ttl_for_cart: string,
        initial_user_ttl: string,
        initial_guest_ttl: string,
        bypass_otp: string,
        otp_expire: string,
        access_token_expire_time: string,
        refresh_token_expire_time: string,
        cms_auth_exp: string,
        reg_ex_for_validation: string,
        country_codes: string,
        support: string,
        customer_care_email: string,
        user_change_ttl: string,
        max_pending_state: string,
        minimum_cart_price: string,
        payment_api_timeout: string,
        payment_api_key_prefix: string,
        display_color: string,
        deeplink_fallback: string,
        auth_mech: string,
        addr_show_time: string,

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

        store_code?: string,
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
    interface IMaxRetry {
        create: string,
        update: string,
        get: string,
        sync: string,
        reset: string
    }

    interface IStatus {
        as: string,
        mongo: string,
        cms: string,
        sdm: string,
        freq: {
            get: string,
            geet_once: string,
            get_max: string,
            next_ping: string
        }
    }
}
