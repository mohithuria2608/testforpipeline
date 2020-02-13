declare namespace IOrderSdmRequest {

    interface ICreateOrder {
    }

    interface IOrderDetail {
        sdmOrderRef: number
    }

    interface IProcessCreditCardOnSdm {
        sdmOrderRef: number,
        transaction: any
    }
}
