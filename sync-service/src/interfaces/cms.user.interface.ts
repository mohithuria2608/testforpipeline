declare namespace ICmsUserRequest {
    interface ICmsUserMigrate {
        action: string,
        data: ICmsUser[],
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
