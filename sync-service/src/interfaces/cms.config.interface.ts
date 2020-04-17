declare namespace ICmsConfigRequest {

    interface ICmsConfig {
        type: string,
        action: string,
        data: any,
    }

    interface ICmsConfigGeneral {
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
        enable_bypass_otp: boolean
    }

    interface ICmsConfigPayment {
        store_code: string,
        store_id: string,
        noon_pay_config: {
            brand_code: string,
            country_code: string,
            currency_code: string,
            channel: string,
            decimal: string,
            payment_methods: [
                {
                    id: string,
                    name: string,
                    order_category: string
                }
            ],
            payment_retry_interval: string,
            max_try: string,
            noonpay_order_expiration_time: string,
            businessIdentifier: string,
            app_identifier: string,
            app_access_key: string,
            api_key: string,
            environment: string,
            noonpay_base_url: string,
            noonpay_initiate_payment_end_point: string,
            noonpay_get_order_end_point: string,
            noonpay_get_order_by_reference_end_point: string,
            noonpay_capture_payment_end_point: string,
            noonpay_reverse_payment_end_point: string,
            noonpay_refund_payment_end_point: string,
            code: string,
            status: string,
            sdm: {
                pay_status: string,
                pay_store_tender_id: string,
                pay_sub_type: string,
                pay_type: string
            }
        },
        cod_info: {
            status: string,
            name: string,
            code: string,
            min_order_total: string,
            max_order_total: string,
            sdm: {
                pay_status: string,
                pay_store_tender_id: string,
                pay_sub_type: string,
                pay_type: string
            }
        }
    }

    interface ICmsConfigShipment {
        store_code: string,
        store_id: string,
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

    interface ICmsConfigKafka {
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
                max_try: IMaxRetry,
                interval: {
                    get: string,
                    get_once: string,
                    get_max: string,
                    next_ping: string
                }
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

    interface ICmsConfigCountrySpecifc {
        country_code: string,
        country_name: string,
        concept_id: string,
        sdm_url: string,
        base_currency: string,
        licence: string,
        channel_data: [
            {
                template_id?: string,
                template_status?: string,
                channel_name?: string,
                menu_data?: [
                    {
                        menu_id?: string,
                        menu_state?: string,
                        menu_cluster?: string,
                        frequency_cron?: string,
                        time_cron?: string
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
                    id: string,
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
                    id: string,
                    type: string,
                    delimeters: string
                }
            }
        },
        sdm: {
            licence_code: string,
            concept_id: string,
            menu_template_id: string
        },
        ccode: string,
        customer_care: string,
        support_email: string,
        min_cart_value: string,
        min_cod_cart_value: string
    }

    interface ICmsConfigOrderStatus {
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
