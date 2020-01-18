declare namespace IPromotionRequest {

    interface IPromoData {
        cmsCouponRef: string,
        couponCode: string,
        promotionType: string,
        discountAmount: string,
        maximumQtyDiscountIsAppliedTo: string,
        usesPerCoupon: string,
        usesPerCustomer: string,
        timesUsed: string,
        dateFrom: string,
        dateTo: string,
        ruleName: string,
        shortDescription: string,
        activeFlag: string,
        posId: string,
        maxDiscountAmount: string,
        isVisible: string,
        termsAndConditions: string,
    }
    interface IGetPromotion extends ICommonRequest.IPagination {
        cmsCouponRef?: string,
        couponCode?: string
    }

    interface IValidatePromotion {
        couponCode: string
    }
    interface IApplyPromotion {
        cartId: string,
        couponCode: string
    }

    interface IRemovePromotion {
        cartId: string,
    }
}
