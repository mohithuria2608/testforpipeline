
declare namespace IAddressSDMRequest {
    interface ICreateAddressReq {
        name: string,
        req: ICreateAddress
    }

    interface ICreateAddress {
        customerRegistrationID: string,
        address: {
        }
    }
}
