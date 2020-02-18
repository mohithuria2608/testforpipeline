import * as config from "config"
import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import { syncService } from '../../grpc/client';

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

                contrySpecificValidation: [
                    {
                        country: Constant.DATABASE.COUNTRY.UAE,
                        language: Constant.DATABASE.LANGUAGE.AR,
                        defaultCCode: '+971',
                        phnRegex: String.raw`^[1-9]\d{8}$|^[1-9]\d{8}$`,
                        phnLength: 9,
                        customerCare: "666666666",
                        supportEmail: "kfc_uae@ag.com",
                        cashondelivery: 0,
                        minOrderAmount: 23.5,
                    }
                ],
                errorMessages: Constant.STATUS_MSG.FRONTEND_ERROR
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
    * @method GET
    * @description : Get Privacy Policy
    * */
    async privacyPolicy(headers: ICommonRequest.IHeaders) {
        try {
            return {}
        } catch (error) {
            consolelog(process.cwd(), "privacyPolicy", JSON.stringify(error), false)
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
                        let config = await syncService.fetchConfig({ store_code: Constant.DATABASE.STORE_CODE.KSA_STORE })
                        consolelog(process.cwd(), "config", JSON.stringify(config), true)
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