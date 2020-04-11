declare namespace IOrderRequest {

    interface IOrderData {
        _id: string,
        orderType: string,
        cartId: string,
        sdmOrderRef: number,
        cmsOrderRef: number,
        userId: string,
        sdmUserRef: number,
        country: string,
        status: string,
        sdmOrderStatus: number,
        transLogs: any,
        isActive: number,
        paymentMethodAddedOnSdm: number,
        createdAt: number,
        updatedAt: number,
        items: any,
        itemsHash: string
        address: IAddress,
        store: IStoreInOrder,
        amount: IAmount[],
        language: string,
        promo: IPromotionGrpcRequest.IValidatePromotionRes,
        isFreeItem: boolean,
        trackUntil: number,
        validationRemarks: string,
        amountValidationPassed: boolean,
        newOrderId: number,
        transferDone: boolean,
        contactlessDlvry: number,
        dlvryInstr: string,
        payment: {
            paymentMethodId: number,
            amount: number,
            name: string,
            status: string
        },
        notification: {
            confirmed: boolean,
            cancel: boolean,
            failure: boolean
        },
        env: number
    }

    interface IAddress {
        addressId: string,
        sdmAddressRef: number,
        cmsAddressRef: number,
        countryId: number,
        storeId: number,
        areaId: number,
        cityId: number,
        tag: string,
        bldgName: string,
        description: string,
        flatNum: string,
        addressType: string,
        lat: number,
        lng: number,
    }

    interface IAmount {
        type?: string
        code?: string
        amount?: number,
        sequence?: number,
        action?: string
    }

    interface IStoreInOrder {
        storeId: number,
        countryId: number,
        areaId: number,
        cityId: number,
        location: {
            description: string,
            latitude: number
            longitude: number
        },
        address_en: string,
        address_ar: string,
        name_en: string,
        name_ar: string
    }

    interface IPostOrder extends ICommonRequest.ICordinatesOpt, ICommonRequest.IPagination {
        addressId: string,
        orderType: string,
        paymentMethodId: number,
        cartId: string,
        curMenuId: number,
        menuUpdatedAt: number,
        couponCode?: string,
        contactlessDlvry?: number
        dlvryInstr?: string
    }

    interface IPostOrderOnCms extends IPostOrderPreHookPayload {
        cmsOrderReq: IOrderCMSRequest.ICreateOrderCms
    }

    interface IPostOrderOnSdm extends IPostOrderPreHookPayload {
    }
    interface IPostOrderPreHookPayload {
        headers: ICommonRequest.IHeaders,
        userData: IUserRequest.IUserData,
        address: IUserGrpcRequest.IFetchAddressRes,
        order: IOrderRequest.IOrderData,
        failOrder: boolean,
        firstTry: boolean
    }
    interface IOrderHistory extends ICommonRequest.ICordinatesOpt, ICommonRequest.IPagination {
        isActive: number
    }

    interface IOrderDetail {
        orderId: string,
    }

    interface IOrderStatus {
        orderId: string,
    }
    interface ITrackOrder {
        cCode: string,
        phnNo: string,
        orderId: string,
    }

    interface IGetSdmOrder extends IGetSdmOrderScheduler {
        timeInterval: number
    }

    interface IGetSdmOrderScheduler {
        sdmOrderRef: number,
        language: string
    }
    interface IGetSdmOrderFreq {
        status: string,
        type: string,
        prevTimeInterval: number,
        statusChanged: boolean
    }
}
