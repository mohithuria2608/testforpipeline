
declare namespace IUserSDMRequest {

    interface ICreateUser {
    }

    interface IGetCustomerByUserNameAndPswd {
        customerUserName: string,
        customerPassword: string
    }

    interface IGetCustomerByEmail {
        email: string
    }

    interface IGetCustomerByCustomerId {
        customerID: number
    }

    interface IGetCustomerByMobileNo {
        mobileNo: number
    }

    interface IGetCustomerByPhoneNo {
        phoneNo: number
    }

    interface IGetCustomerSdmUserRef extends IGetCustomerByEmail, IGetCustomerByPhoneNo {

    }
}
