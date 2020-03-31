
declare namespace IUserSDMRequest {
    interface ICreateUserReq {
        name: string,
        req: ICreateUser
    }

    interface ICreateUser extends ICommonRequest.ISDM {
        customer: {
            CUST_CLASSID: number,
            CUST_EMAIL: string,// "nkhan1000@mailinator.com",
            CUST_FIRSTNAME: string,// "nusrattest",
            CUST_LASTNAME: string,// "user",
            CUST_NATID: number,
            CUST_NOTIFICATION_MOBILE: string,
            CUST_PHONEAREACODE: string,
            CUST_PHONECOUNTRYCODE: string,
            CUST_PHONELOOKUP: string,
            CUST_PHONENUMBER: string,
            CUST_PHONETYPE: number,
            PASSWORD: string,
            USERNAME: string,
            WCUST_FIRSTNAME: string,
            WCUST_IS_GUEST: boolean,
            WCUST_LASTNAME: string,
            WCUST_STATUS: number
        }
    }

    interface IUpdateUserReq {
        name: string,
        req: IUpdateUser,
    }

    interface IUpdateUser extends ICommonRequest.ISDM {
        customer: {
            CUST_CLASSID: number,
            CUST_CORPID: number,
            CUST_EMAIL: string,// "nkhan1000@mailinator.com",
            CUST_FIRSTNAME: string,// "nusrattest",
            CUST_ID: number,
            CUST_LASTNAME: string,// "user",
            CUST_NATID: number,
            CUST_NOTIFICATION_MOBILE: string,
            CUST_PHONEAREACODE: string,
            CUST_PHONECOUNTRYCODE: string,
            CUST_PHONELOOKUP: string,
            CUST_PHONENUMBER: string,
            CUST_PHONETYPE: number,
            PASSWORD: string,
            USERNAME: string,
            WCUST_FIRSTNAME: string,
            WCUST_IS_GUEST: boolean,
            WCUST_LASTNAME: string,
            WCUST_STATUS: number
        }
    }

    interface IUpdateCustomerTokenReq {
        name: string,
        req: IUpdateCustomerToken,
    }

    interface IUpdateCustomerToken {

    }

}
