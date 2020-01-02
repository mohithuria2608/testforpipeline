
declare namespace IUserCMSRequest {

    interface IHeader {}
    
    interface ICreateUser {
        customer: ICustomer,
        password: string
    }

    interface ICustomer {
        firstname: string,
        lastname: string,
        email: string,
        store_id: number,
        website_id: number,
        addresses: any,
    }
}
