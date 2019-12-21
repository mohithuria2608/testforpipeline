declare namespace IUserGrpcRequest {

    interface ICreateUserDataOnSdmReq {
        request: ICreateUserDataOnSdm
    }

    interface ICreateUserDataOnSdm {
    }

    interface ICreateUserDataOnCmsReq {
        request: ICreateUserDataOnCms
    }

    interface ICreateUserDataOnCms {
        aerospikeId: string,
        lastname: string
        firstname: string
        email: string
        storeId: number
        websiteId: number,
        password: string
    }
}
