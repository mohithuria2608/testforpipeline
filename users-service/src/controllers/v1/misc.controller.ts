import * as config from "config"
import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import { appversion } from '../../sync-config/appversion';
import { configuration } from '../../sync-config/configuration';

export class MiscController {

    constructor() { }

    /**
    * @method GET
    * @description : Get CMS configurable configurations for client
    * */
    async configuration(headers: ICommonRequest.IHeaders) {
        try {
            let redirectUrl = config.get("server.order.url")
            return {
                otpDigits: 4,
                blobBaseUrl: config.get("blobBaseUrl"),
                locationVicinity: 100,
                paymentSuccessUrl: redirectUrl + "payment/success",
                paymentFailureUrl: redirectUrl + "payment/failure",
                addressShownTime: Constant.CONF.GENERAL.ADDR_SHOW_TIME,
                splashExpireTime: Constant.CONF.GENERAL.SPLASH_EXPR_TIME,
                imgEtagThreshold: Constant.CONF.GENERAL.IMG_ETAG_THRESHOLD,
                contactlessVisble: Constant.CONF.GENERAL.CONTACTLESS_VISBILE,
                contactlessClikable: Constant.CONF.GENERAL.CONTACTLESS_CLICK_ENABLE,
                contrySpecificValidation: [
                    {
                        country: Constant.DATABASE.COUNTRY.UAE,
                        language: Constant.DATABASE.LANGUAGE.AR,
                        defaultCCode: Constant.CONF.COUNTRY_SPECIFIC[headers.country].CCODE,
                        phnRegex: String.raw`^[1-9]\d{8}$|^[1-9]\d{8}$`,
                        phnLength: 9,
                        customerCare: Constant.CONF.COUNTRY_SPECIFIC[headers.country].CUSTOMER_CARE,
                        supportEmail: Constant.CONF.COUNTRY_SPECIFIC[headers.country].SUPPORT_EMAIL,
                        cashondelivery: 0,
                        minOrderAmount: Constant.CONF.COUNTRY_SPECIFIC[headers.country].MIN_CART_VALUE,
                        homeOverlay: Constant.CONF.COUNTRY_SPECIFIC[headers.country].HOME_OVERLAY[headers.language],
                        addressType: Constant.CONF.COUNTRY_SPECIFIC[headers.country].ADDRESS_TYPE
                    }
                ],
                errorMessages: Constant.STATUS_MSG.FRONTEND_ERROR[headers.language],
                constants: {
                    cartAmount: Constant.DATABASE.TYPE.CART_AMOUNT.FRONTEND_TEXT[headers.language],
                    orderStatus: Constant.CONF.ORDER_STATUS.FRONTEND_TEXT[headers.language],
                    paymentMethod: Constant.DATABASE.TYPE.PAYMENT_METHOD.FRONTEND_TEXT[headers.language]
                }
            }
        } catch (error) {
            consolelog(process.cwd(), "configuration", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
    * @method INTERNAL
    * @description : PING SERVICES
    * */
    async pingService(payload: IKafkaGrpcRequest.IKafkaBody) {
        try {
            let argv: ICommonRequest.IPingService = JSON.parse(payload.as.argv)
            if (argv && argv.set) {
                let set = argv.set;
                consolelog(process.cwd(), "Pinged for  :::", set, true)
                switch (set) {
                    case Constant.SET_NAME.CONFIG: {
                        await configuration.init({
                            store_code: argv.store_code,
                            type: argv.type,
                            bootstrap: false,
                            country: argv.country
                        })
                        break;
                    }
                    case Constant.SET_NAME.APP_VERSION: {
                        await appversion.init();
                        break;
                    }
                }
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "pingService", JSON.stringify(error), false)
            return {}
        }
    }
}

export const miscController = new MiscController();