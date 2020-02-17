
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
            CUST_NOTIFICATION_MOBILE: string,// 525454090,
            CUST_PHONEAREACODE: string,//52
            CUST_PHONELOOKUP: string,// 525454090,
            CUST_PHONENUMBER: string,// 5454090,
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

    interface IUpdateUser extends ICommonRequest.ISDM { }
    interface IGetCustomerByUserNameAndPswdReq {
        name: string,
        req: IGetCustomerByUserNameAndPswd
    }
    interface IGetCustomerByUserNameAndPswd extends ICommonRequest.ISDM {
        customerUserName: string,
        customerPassword: string
    }

    interface IGetCustomerByEmailReq {
        name: string,
        req: IGetCustomerByEmail
    }
    interface IGetCustomerByEmail extends ICommonRequest.ISDM {
        email: string
    }

    interface IGetCustomerByCustomerIdReq {
        name: string,
        req: IGetCustomerByCustomerId
    }
    interface IGetCustomerByCustomerId extends ICommonRequest.ISDM {
        customerID: number
    }

    interface IGetCustomerByMobileNoReq {
        name: string,
        req: IGetCustomerByMobileNo
    }
    interface IGetCustomerByMobileNo extends ICommonRequest.ISDM {
        mobileNo: number
    }

    interface IGetCustomerByPhoneNoReq {
        name: string,
        req: IGetCustomerByPhoneNo
    }
    interface IGetCustomerByPhoneNo extends ICommonRequest.ISDM {
        phoneNo: number
    }
}
