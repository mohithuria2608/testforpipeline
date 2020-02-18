
declare namespace IUserCMSRequest {

    interface IHeader { }

    interface ICreateUser {
        email: string
        phone: string
        websiteId: string
        firstName: string
        lastName: string
        password: string
    }

    interface IUpdateUser {
        customerId: number,
        websiteId: string,
        email?: string,
        phone?: string,
        firstName?: string,
        lastName?: string,
        alternatePhone?: string
    }

    interface IGetUser {
        // websiteId: string,
        cmsUserRef?: number,
        email?: string,
        fullPhnNo?: string,
    }
}
