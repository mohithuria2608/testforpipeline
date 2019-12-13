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
                contrySpecificValidation: [
                    {
                        country: Constant.DATABASE.COUNTRY.UAE,
                        language: Constant.DATABASE.LANGUAGE.AR,
                        defaultCCode: '+971',
                        phnRegex: `/^[1-9]\\d{8}$|^[1-9]\\d{8}$/`,
                        phnLength: 9
                    }
                ],
                errorMessages: Constant.STATUS_MSG.FRONTEND_ERROR
            }
        } catch (err) {
            consolelog("configuration", err, false)
            return Promise.reject(err)
        }
    }
}

export const miscController = new MiscController();