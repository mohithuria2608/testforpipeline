import * as config from "config"
import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import { syncService } from '../../grpc/client';
import { configuration } from '../../sync/configuration';

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
                        // homeOverlay: Constant.CONF.COUNTRY_SPECIFIC[headers.country].HOME_OVERLAY[headers.language],
                        addressType: [
                            {
                                type: Constant.DATABASE.TYPE.ADDRESS.DELIVERY.TYPE,
                                enable: true,
                                subType: [{
                                    type: Constant.DATABASE.TYPE.ADDRESS.DELIVERY.SUBTYPE.DELIVERY,
                                    enable: true
                                }]
                            },
                            {
                                type: Constant.DATABASE.TYPE.ADDRESS.PICKUP.TYPE,
                                enable: true,
                                subType: [{
                                    type: Constant.DATABASE.TYPE.ADDRESS.PICKUP.SUBTYPE.CARHOP,
                                    enable: true
                                },
                                {
                                    type: Constant.DATABASE.TYPE.ADDRESS.PICKUP.SUBTYPE.STORE,
                                    enable: true
                                }]
                            }
                        ]
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
    * @method GET
    * @description : Get List of FAQs
    * */
    async faq(headers: ICommonRequest.IHeaders) {
        try {
            headers.language = headers.language ? headers.language : Constant.DATABASE.LANGUAGE.EN
            return Constant.DATABASE.FAQ[headers.language]
        } catch (error) {
            consolelog(process.cwd(), "faq", JSON.stringify(error), false)
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
                consolelog(process.cwd(), "Pinged by  :::", set, true)
                switch (set) {
                    case Constant.SET_NAME.CONFIG: {
                        if (argv.store_code) {
                            let storeCodeConfig: ISyncGrpcRequest.IConfig[] = await syncService.fetchConfig({ store_code: argv.store_code, type: Constant.DATABASE.TYPE.CONFIG.PAYMENT })
                            if (storeCodeConfig && storeCodeConfig.length > 0) {
                                if (storeCodeConfig[0].payment) {
                                    if (storeCodeConfig[0].createdAt != global.configSync.payment)
                                        Constant.paymentConfigSync(storeCodeConfig[0].store_code, storeCodeConfig[0].payment, storeCodeConfig[0].createdAt)
                                }
                            }
                        } else if (argv.type) {
                            let typeConfig: ISyncGrpcRequest.IConfig[] = await syncService.fetchConfig({ type: argv.type })
                            if (typeConfig && typeConfig.length > 0) {
                                switch (argv.type) {
                                    case Constant.DATABASE.TYPE.CONFIG.GENERAL: {
                                        if (typeConfig[0].createdAt != global.configSync.general)
                                            Constant.generalConfigSync(typeConfig[0].general, typeConfig[0].createdAt)
                                        break;
                                    }
                                }
                            }
                        }
                        break;
                    }
                    case Constant.SET_NAME.APP_VERSION: {
                        let appVersionConfig = await syncService.fetchAppversion({ isActive: 1 })
                        consolelog(process.cwd(), "appversion", JSON.stringify(appVersionConfig), true)
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