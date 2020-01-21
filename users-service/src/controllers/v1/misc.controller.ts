import * as config from "config"
import * as Constant from '../../constant'
import { consolelog } from '../../utils'

export class MiscController {

    constructor() { }

    /**
    * @method GET
    * @description : Get CMS configurable configurations for client
    * */
    async configuration(headers: ICommonRequest.IHeaders) {
        try {
            return {
                otpDigits: 4,
                blobBaseUrl: config.get("blobBaseUrl"),
                locationVicinity: 100,
                contrySpecificValidation: [
                    {
                        country: Constant.DATABASE.COUNTRY.UAE,
                        language: Constant.DATABASE.LANGUAGE.AR,
                        defaultCCode: '+971',
                        phnRegex: String.raw`^[1-9]\d{8}$|^[1-9]\d{8}$`,
                        phnLength: 9,
                        customerCare: "666666666"
                    }
                ],
                errorMessages: Constant.STATUS_MSG.FRONTEND_ERROR
            }
        } catch (error) {
            consolelog(process.cwd(), "configuration", error, false)
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
            consolelog(process.cwd(), "faq", error, false)
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
            consolelog(process.cwd(), "privacyPolicy", error, false)
            return Promise.reject(error)
        }
    }
}

export const miscController = new MiscController();