
declare namespace IUserSDMRequest {
    interface ICreateUserReq {
        name: string,
        req: ICreateUser
    }

    interface ICreateUser {
        customer: {
            CUST_CLASSID: number,
            CUST_EMAIL: string,// "nkhan1000@mailinator.com",
            CUST_FIRSTNAME: string,// "nusrattest",
            CUST_LASTNAME: string,// "user",
            CUST_NATID: number,
            CUST_NOTIFICATION_MOBILE: number,// 525454090,
            CUST_PHONEAREACODE: number,//52
            CUST_PHONELOOKUP: number,// 525454090,
            CUST_PHONENUMBER: number,// 5454090,
            CUST_PHONETYPE: number,
            PASSWORD: string,
            USERNAME: string,
            WCUST_FIRSTNAME: string,
            WCUST_IS_GUEST: boolean,
            WCUST_LASTNAME: string,
        }
    }

    interface IUpdateUserReq {
        name: string,
        req: IUpdateUser,
    }

    interface IUpdateUser { }
    interface IGetCustomerByUserNameAndPswdReq {
        name: string,
        req: IGetCustomerByUserNameAndPswd
    }
    interface IGetCustomerByUserNameAndPswd {
        customerUserName: string,
        customerPassword: string
    }

    interface IGetCustomerByEmailReq {
        name: string,
        req: IGetCustomerByEmail
    }
    interface IGetCustomerByEmail {
        email: string
    }

    interface IGetCustomerByCustomerIdReq {
        name: string,
        req: IGetCustomerByCustomerId
    }
    interface IGetCustomerByCustomerId {
        customerID: number
    }

    interface IGetCustomerByMobileNoReq {
        name: string,
        req: IGetCustomerByMobileNo
    }
    interface IGetCustomerByMobileNo {
        mobileNo: number
    }

    interface IGetCustomerByPhoneNoReq {
        name: string,
        req: IGetCustomerByPhoneNo
    }
    interface IGetCustomerByPhoneNo {
        phoneNo: number
    }
}
