declare namespace IOrderSdmRequest {

    interface ICreateOrder {
    }

    interface IOrderDetail {
        sdmOrderRef: number,
        language: string,
    }

    interface IProcessCreditCardOnSdm {
        sdmOrderRef: number,
        transaction: any,
        language: string
    }

    interface ICancelOrder {
        sdmOrderRef: number,
        voidReason: number,
        validationRemarks: string,
        autoApprove?: string,
        language: string
    }
}
