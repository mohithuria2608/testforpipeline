declare namespace IPromotionGrpcRequest {

    interface IValidatePromotion {
        couponCode?: string,
    }

    interface IValidatePromotionRes {
        cmsCouponRef: number,
        couponCode: string,
        promotionType: string,
        discountAmount: number,
        maxDiscountQty: number,
        usesPerCoupon: number,
        usesPerCust: number,
        timesUsed: number,
        dateFrom: string,
        dateTo: string,
        ruleName: string,
        shortDesc: string,
        activeFlag: number,
        posId: number,
        maxDiscountAmt: number,
        isVisible: number,
        termsAndConds: string,
    }
}