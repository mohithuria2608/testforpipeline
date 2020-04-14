declare namespace IConfigRequest {

    interface IConfig {
        type: string,
        id: string,

        store_code?: string,
        store_id?: string,

        general?: IGeneral
        kafka?: IKafka
        orderStatus?: IOrderStatus
        payment?: IPayment
        shipment?: IShipment
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
        user_change_ttl: number,
        max_pending_state: number,
        payment_api_timeout: number,
        payment_api_key_prefix: string,
        display_color: boolean,
        deeplink_fallback: string,
        auth_mech: string,
        addr_show_time: number,
    }
    interface IKafka {
        sdm?: {
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
                max_try: IMaxRetry,
                interval: {
                    get: number,
                    get_once: number,
                    get_max: number,
                    next_ping: number
                }
            }
        },
        cms?: {
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
        as?: {
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
        cart_config?: IStatus,
        pending_config?: IStatus,
        confirmed_config?: IStatus,
        prepared_config?: IStatus,
        ready_config?: IStatus,
        ontheway_config?: IStatus,
        delivered_config?: IStatus,
        closed_config?: IStatus,
        cancelled_config?: IStatus,
        failure_config?: IStatus
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
        noonpayConfig: {
            channel: string,
            decimal: number,
            brandCode: string,
            countryCode: string,
            currencyCode: string,
            paymentMethods: IPaymentMethods[],
            paymentRetryInterval: number,
            maxTry: number,
            noonpayOrderExpirationTime: number,
            businessIdentifier: string,
            appIdentifier: string,
            appAccessKey: string,
            apiKey: string,
            environment: string,
            noonpayBaseUrl: string,
            noonpayInitiatePaymentEndPoint: string,
            noonpayGetOrderEndPoint: string,
            noonpayGetOrderByReferenceEndPoint: string,
            noonpayCapturePaymentEndPoint: string,
            noonpayReversePaymentEndPoint: string,
            noonpayRefundPaymentEndPoint: string,
            code: string,
            status: number,
            // sdm: {
            //     pay_status: string,
            //     pay_store_tender_id: string,
            //     pay_sub_type: string,
            //     pay_type: string
            // }
        },
        codInfo: {
            status: number,
            name: string,
            code: string,
            min_order_total: number,
            max_order_total: number,
            // sdm: {
            //     pay_status: string,
            //     pay_store_tender_id: string,
            //     pay_sub_type: string,
            //     pay_type: string
            // }
        }
    }
    interface IPaymentMethods {
        id?: number,
        name?: string,
        orderCategory?: string
    }
    interface IShipment {
        free_shipping: {
            status: string,
            title: string,
            min_order_total: string,
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
        country_name: string,
        base_currency: string,
        channel_data: [
            {
                template_id: number,
                template_status: number,
                channel_name: string,
                menu_data: [
                    {
                        menu_id: number,
                        menu_state: number,
                        menu_cluster: number,
                        frequency_cron: number,
                        time_cron: number
                    }
                ]
            }
        ],
        home_overlay: {
            En: {
                mediaUrl: string,
                gif: string,
                mediaType: string,
                extension: string,
                action: {
                    id: number,
                    type: string,
                    delimeters: string
                }
            },
            Ar: {
                mediaUrl: string,
                gif: string,
                mediaType: string,
                extension: string,
                action: {
                    id: number,
                    type: string,
                    delimeters: string
                }
            }
        },
        sdm: {
            sdm_url: string,
            licence_code: string,
            concept_id: number,
            menu_template_id: number
        },
        ccode: string,
        customer_care: string,
        support_email: string,
        min_cart_value: number,
        min_cod_cart_value: number
    }

    interface IFetchConfig {
        type?: string,
        store_code?: string
    }
}
