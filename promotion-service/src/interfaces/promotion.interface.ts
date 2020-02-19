declare namespace IPromotionRequest {

    interface IPromoData {
        couponId: string,
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
        couponId?: string,
        couponCode?: string
    }

    interface IValidatePromotion {
        couponCode: string
    }
}
