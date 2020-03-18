import * as config from "config"
import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import { syncService } from '../../grpc/client';
import { appversion } from "../../appversion";

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
                addressShownTime: Constant.SERVER.ADDR_SHOW_TIME,
                contrySpecificValidation: [
                    {
                        country: Constant.DATABASE.COUNTRY.UAE,
                        language: Constant.DATABASE.LANGUAGE.AR,
                        defaultCCode: Constant.SERVER.DEFAULT_CCODE,
                        phnRegex: String.raw`^[1-9]\d{8}$|^[1-9]\d{8}$`,
                        phnLength: 9,
                        customerCare: Constant.SERVER.CUSTOMER_CARE,
                        supportEmail: Constant.SERVER.SUPPORT_EMAIL,
                        cashondelivery: 0,
                        minOrderAmount: Constant.SERVER.MIN_CART_VALUE,
                    }
                ],
                errorMessages: Constant.STATUS_MSG.FRONTEND_ERROR[headers.language],
                constants: {
                    cartAmount: Constant.DATABASE.TYPE.CART_AMOUNT.FRONTEND_TEXT[headers.language],
                    orderStatus: Constant.DATABASE.STATUS.ORDER.FRONTEND_TEXT[headers.language],
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
            return [
                {
                    category: "A",
                    questionair: [
                        {
                            ques: "ques1",
                            ans: "ans1"
                        },
                        {
                            ques: "ques2",
                            ans: "ans2"
                        }
                    ]
                },
                {
                    category: "B",
                    questionair: [
                        {
                            ques: "ques3",
                            ans: "ans3"
                        },
                        {
                            ques: "ques4",
                            ans: "ans4"
                        },
                    ]
                }
            ]
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
                        let config
                        if (argv.store_code) {
                            config = await syncService.fetchConfig({ store_code: argv.store_code })
                        } else if (argv.type) {
                            config = await syncService.fetchConfig({ type: argv.type })
                            if (config && config.length > 0) {
                                switch (argv.type) {
                                    case Constant.DATABASE.TYPE.CONFIG.GENERAL: {
                                        if (config[0].createdAt != global.configSync.general)
                                            Constant.generalConfigSync(config[0].general, config[0].createdAt)
                                        break;
                                    }
                                }
                            }
                        }
                        consolelog(process.cwd(), "config", JSON.stringify(config), true)
                        break;
                    }
                    case Constant.SET_NAME.APP_VERSION: {
                        let config = await syncService.fetchAppversion({ isActive: 1 })
                        consolelog(process.cwd(), "appversion", JSON.stringify(config), true)
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