
declare namespace IUserCMSRequest {

    interface IHeader { }

    interface ICreateUser {
        email: string
        phone: string
        websiteId: string
        firstName: string
        lastName: string
        // password: string,
        sdmUserRef?: number
        sdmCorpRef?: number
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
        cmsUserRef?: number,
        email?: string,
        fullPhnNo?: string,
    }

    interface ICmsUser {
        customerId: string,
        email: string,
        firstName: string,
        lastName: string,
        phone: string,
        SdmUserRef: string,
        SdmCorpRef: string,
        alternatePhone: string[],
        address: IAddressCMSRequest.ICmsAddress[]
    }
}
