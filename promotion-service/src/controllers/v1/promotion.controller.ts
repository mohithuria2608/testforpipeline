import * as fs from 'fs';
import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'

export class PromotionController {
    constructor() { }

    /**
     * @method POST
     * @description : Post bulk menu data
     * */
    async postMenu() {
        try {
            // let rawdata = fs.readFileSync(__dirname + '/../../../model/menu.json', 'utf-8');
            // let menu = JSON.parse(rawdata);
            // for (const iterator of menu) {
            //     ENTITY.MenuE.post(iterator)
            // }
            return {}
        } catch (err) {
            consolelog(process.cwd(), "postMenu", err, false)
            return Promise.reject(err)
        }
    }

    /**
    * @method GET
    * @description gets the list of promotions
    * */
    async getPromotionsList(headers: ICommonRequest.IHeaders, payload: IPromotionRequest.IFetchPromotion) {
        try {
            // return {
            //     list: await ENTITY.PromotionE.getPromotions(),
            //     currentPage: parseInt(payload.page),
            //     nextPage: -1
            // };

            let testlist = [{
                couponId: 3,
                couponCode: 'KFC 10',
                promotionType: 'by_percent',
                discountAmount: 10,
                maxDiscountQty: 1,
                usesPerCoupon: 1000,
                usesPerCust: 10,
                timesUsed: 1,
                dateFrom: '2019-12-01',
                dateTo: '2019-12-30',
                ruleName: '10% off upto max 10',
                shortDesc: '%s discount off with a cap of the max amount',
                activeFlag: 1,
                posId: 0,
                maxDiscountAmt: 0,
                isVisible: 0,
                termsAndConds: "<html>  <head>  </head> <body> promotion-service@kfc2019</body> </html>"
            },
            {
                couponId: 4,
                couponCode: 'KFC 15',
                promotionType: 'cart_fixed',
                discountAmount: 15,
                maxDiscountQty: 15,
                usesPerCoupon: 10,
                usesPerCust: 1,
                timesUsed: 0,
                dateFrom: '2019-12-01',
                dateTo: '2019-12-30',
                ruleName: '15 $off',
                shortDesc: 'Absolute discount',
                activeFlag: 1,
                posId: 111,
                maxDiscountAmt: 100,
                isVisible: 0,
                termsAndConds: "<html>  <head>  </head> <body> promotion-service@kfc2019</body> </html>"
            },
            {
                couponId: 2,
                couponCode: 'FREE DEL',
                promotionType: 'by_percent',
                discountAmount: 0,
                maxDiscountQty: NaN,
                usesPerCoupon: 0,
                usesPerCust: 1,
                timesUsed: 0,
                dateFrom: '2019-12-01',
                dateTo: '2019-12-30',
                ruleName: 'Free Delivery',
                shortDesc: 'Free Shipping with cart price greater than 200',
                activeFlag: 1,
                posId: 0,
                maxDiscountAmt: 0,
                isVisible: 0,
                termsAndConds: "<html>  <head>  </head> <body> promotion-service@kfc2019</body> </html>"
            },
            {
                couponId: 5,
                couponCode: 'FREE ITEM',
                promotionType: 'buy_x_get_y',
                discountAmount: 1,
                maxDiscountQty: NaN,
                usesPerCoupon: 100,
                usesPerCust: 100,
                timesUsed: 0,
                dateFrom: '2019-12-12',
                dateTo: '2019-12-31',
                ruleName: 'Buy X get y free of specific category',
                shortDesc: 'Buy X get y free of specific category',
                activeFlag: 1,
                posId: 0,
                maxDiscountAmt: 0,
                isVisible: 0,
                termsAndConds: "<html>  <head>  </head> <body> promotion-service@kfc2019</body> </html>"
            },
            {
                couponId: 6,
                couponCode: 'KFC15',
                promotionType: 'by_percent',
                discountAmount: 15,
                maxDiscountQty: 15,
                usesPerCoupon: 1000,
                usesPerCust: 1000,
                timesUsed: 0,
                dateFrom: '2019-12-01',
                dateTo: '2019-12-30',
                ruleName: '15% off',
                shortDesc: '15% off based on subtotal',
                activeFlag: 1,
                posId: 0,
                maxDiscountAmt: 0,
                isVisible: 0,
                termsAndConds: "<html>  <head>  </head> <body> promotion-service@kfc2019</body> </html>"
            },
            {
                couponId: 7,
                couponCode: 'KFCWQ860URUHD7NEW',
                promotionType: 'by_percent',
                discountAmount: 100,
                maxDiscountQty: 1,
                usesPerCoupon: 4,
                usesPerCust: 2,
                timesUsed: 4,
                dateFrom: '2019-12-01',
                dateTo: '2019-12-30',
                ruleName: 'FREEPEP',
                shortDesc: 'free pepsi',
                activeFlag: 1,
                posId: 0,
                maxDiscountAmt: 0,
                isVisible: 0,
                termsAndConds: "<html>  <head>  </head> <body> promotion-service@kfc2019</body> </html>"
            },
            {
                couponId: 7,
                couponCode: 'KFC9TX8I7OC892NEW',
                promotionType: 'by_percent',
                discountAmount: 100,
                maxDiscountQty: 1,
                usesPerCoupon: 4,
                usesPerCust: 2,
                timesUsed: 4,
                dateFrom: '2019-12-01',
                dateTo: '2019-12-30',
                ruleName: 'FREEPEP',
                shortDesc: 'free pepsi',
                activeFlag: 1,
                posId: 0,
                maxDiscountAmt: 0,
                isVisible: 0,
                termsAndConds: "<html>  <head>  </head> <body> promotion-service@kfc2019</body> </html>"
            },
            {
                couponId: 7,
                couponCode: 'KFCJP2IZXPUO8XNEW',
                promotionType: 'by_percent',
                discountAmount: 100,
                maxDiscountQty: 1,
                usesPerCoupon: 4,
                usesPerCust: 2,
                timesUsed: 4,
                dateFrom: '2019-12-01',
                dateTo: '2019-12-30',
                ruleName: 'FREEPEP',
                shortDesc: 'free pepsi',
                activeFlag: 1,
                posId: 0,
                maxDiscountAmt: 0,
                isVisible: 0,
                termsAndConds: "<html>  <head>  </head> <body> promotion-service@kfc2019</body> </html>"
            },
            {
                couponId: 7,
                couponCode: 'KFCERUNQBBOSUINEW',
                promotionType: 'by_percent',
                discountAmount: 100,
                maxDiscountQty: 1,
                usesPerCoupon: 4,
                usesPerCust: 2,
                timesUsed: 4,
                dateFrom: '2019-12-01',
                dateTo: '2019-12-30',
                ruleName: 'FREEPEP',
                shortDesc: 'free pepsi',
                activeFlag: 1,
                posId: 0,
                maxDiscountAmt: 0,
                isVisible: 0,
                termsAndConds: "<html>  <head>  </head> <body> promotion-service@kfc2019</body> </html>"
            },
            {
                couponId: 7,
                couponCode: 'KFC4ZYIHFZTN6WNEW',
                promotionType: 'by_percent',
                discountAmount: 100,
                maxDiscountQty: 1,
                usesPerCoupon: 4,
                usesPerCust: 2,
                timesUsed: 4,
                dateFrom: '2019-12-01',
                dateTo: '2019-12-30',
                ruleName: 'FREEPEP',
                shortDesc: 'free pepsi',
                activeFlag: 1,
                posId: 0,
                maxDiscountAmt: 0,
                isVisible: 0,
                termsAndConds: "<html>  <head>  </head> <body> promotion-service@kfc2019</body> </html>"
            },
            {
                couponId: 7,
                couponCode: 'KFCVJFSLUFU4OLNEW',
                promotionType: 'by_percent',
                discountAmount: 100,
                maxDiscountQty: 1,
                usesPerCoupon: 4,
                usesPerCust: 2,
                timesUsed: 4,
                dateFrom: '2019-12-01',
                dateTo: '2019-12-30',
                ruleName: 'FREEPEP',
                shortDesc: 'free pepsi',
                activeFlag: 1,
                posId: 0,
                maxDiscountAmt: 0,
                isVisible: 0,
                termsAndConds: "<html>  <head>  </head> <body> promotion-service@kfc2019</body> </html>"
            },
            {
                couponId: 7,
                couponCode: 'KFC6FWCIQ8M5YBNEW',
                promotionType: 'by_percent',
                discountAmount: 100,
                maxDiscountQty: 1,
                usesPerCoupon: 4,
                usesPerCust: 2,
                timesUsed: 4,
                dateFrom: '2019-12-01',
                dateTo: '2019-12-30',
                ruleName: 'FREEPEP',
                shortDesc: 'free pepsi',
                activeFlag: 1,
                posId: 0,
                maxDiscountAmt: 0,
                isVisible: 0,
                termsAndConds: "<html>  <head>  </head> <body> promotion-service@kfc2019</body> </html>"
            },
            {
                couponId: 7,
                couponCode: 'KFCEP6XIDT7KIJNEW',
                promotionType: 'by_percent',
                discountAmount: 100,
                maxDiscountQty: 1,
                usesPerCoupon: 4,
                usesPerCust: 2,
                timesUsed: 4,
                dateFrom: '2019-12-01',
                dateTo: '2019-12-30',
                ruleName: 'FREEPEP',
                shortDesc: 'free pepsi',
                activeFlag: 1,
                posId: 0,
                maxDiscountAmt: 0,
                isVisible: 0,
                termsAndConds: "<html>  <head>  </head> <body> promotion-service@kfc2019</body> </html>"
            },
            {
                couponId: 7,
                couponCode: 'KFCBOGBEV29KCFNEW',
                promotionType: 'by_percent',
                discountAmount: 100,
                maxDiscountQty: 1,
                usesPerCoupon: 4,
                usesPerCust: 2,
                timesUsed: 4,
                dateFrom: '2019-12-01',
                dateTo: '2019-12-30',
                ruleName: 'FREEPEP',
                shortDesc: 'free pepsi',
                activeFlag: 1,
                posId: 0,
                maxDiscountAmt: 0,
                isVisible: 0,
                termsAndConds: "<html>  <head>  </head> <body> promotion-service@kfc2019</body> </html>"
            },
            {
                couponId: 7,
                couponCode: 'KFCRH5FD9K0T98NEW',
                promotionType: 'by_percent',
                discountAmount: 100,
                maxDiscountQty: 1,
                usesPerCoupon: 4,
                usesPerCust: 2,
                timesUsed: 4,
                dateFrom: '2019-12-01',
                dateTo: '2019-12-30',
                ruleName: 'FREEPEP',
                shortDesc: 'free pepsi',
                activeFlag: 1,
                posId: 0,
                maxDiscountAmt: 0,
                isVisible: 0,
                termsAndConds: "<html>  <head>  </head> <body> promotion-service@kfc2019</body> </html>"
            },
            {
                couponId: 7,
                couponCode: 'KFCCP5GG3FZZ9ZNEW',
                promotionType: 'by_percent',
                discountAmount: 100,
                maxDiscountQty: 1,
                usesPerCoupon: 4,
                usesPerCust: 2,
                timesUsed: 4,
                dateFrom: '2019-12-01',
                dateTo: '2019-12-30',
                ruleName: 'FREEPEP',
                shortDesc: 'free pepsi',
                activeFlag: 1,
                posId: 0,
                maxDiscountAmt: 0,
                isVisible: 0,
                termsAndConds: "<html>  <head>  </head> <body> promotion-service@kfc2019</body> </html>"
            },
            {
                couponId: 7,
                couponCode: 'KFCUSMC7IDG5RTNEW',
                promotionType: 'by_percent',
                discountAmount: 100,
                maxDiscountQty: 1,
                usesPerCoupon: 4,
                usesPerCust: 2,
                timesUsed: 4,
                dateFrom: '2019-12-01',
                dateTo: '2019-12-30',
                ruleName: 'FREEPEP',
                shortDesc: 'free pepsi',
                activeFlag: 1,
                posId: 0,
                maxDiscountAmt: 0,
                isVisible: 0,
                termsAndConds: "<html>  <head>  </head> <body> promotion-service@kfc2019</body> </html>"
            },
            {
                couponId: 7,
                couponCode: 'KFCF23YILZ4755NEW',
                promotionType: 'by_percent',
                discountAmount: 100,
                maxDiscountQty: 1,
                usesPerCoupon: 4,
                usesPerCust: 2,
                timesUsed: 4,
                dateFrom: '2019-12-01',
                dateTo: '2019-12-30',
                ruleName: 'FREEPEP',
                shortDesc: 'free pepsi',
                activeFlag: 1,
                posId: 0,
                maxDiscountAmt: 0,
                isVisible: 0,
                termsAndConds: "<html>  <head>  </head> <body> promotion-service@kfc2019</body> </html>"
            },
            {
                couponId: 7,
                couponCode: 'KFCOBS16S3S3W3NEW',
                promotionType: 'by_percent',
                discountAmount: 100,
                maxDiscountQty: 1,
                usesPerCoupon: 4,
                usesPerCust: 2,
                timesUsed: 4,
                dateFrom: '2019-12-01',
                dateTo: '2019-12-30',
                ruleName: 'FREEPEP',
                shortDesc: 'free pepsi',
                activeFlag: 1,
                posId: 0,
                maxDiscountAmt: 0,
                isVisible: 0,
                termsAndConds: "<html>  <head>  </head> <body> promotion-service@kfc2019</body> </html>"
            },
            {
                couponId: 7,
                couponCode: 'KFCQ8AW2J2OL4YNEW',
                promotionType: 'by_percent',
                discountAmount: 100,
                maxDiscountQty: 1,
                usesPerCoupon: 4,
                usesPerCust: 2,
                timesUsed: 4,
                dateFrom: '2019-12-01',
                dateTo: '2019-12-30',
                ruleName: 'FREEPEP',
                shortDesc: 'free pepsi',
                activeFlag: 1,
                posId: 0,
                maxDiscountAmt: 0,
                isVisible: 0,
                termsAndConds: "<html>  <head>  </head> <body> promotion-service@kfc2019</body> </html>"
            },
            {
                couponId: 7,
                couponCode: 'KFC10JSP983FCZNEW',
                promotionType: 'by_percent',
                discountAmount: 100,
                maxDiscountQty: 1,
                usesPerCoupon: 4,
                usesPerCust: 2,
                timesUsed: 4,
                dateFrom: '2019-12-01',
                dateTo: '2019-12-30',
                ruleName: 'FREEPEP',
                shortDesc: 'free pepsi',
                activeFlag: 1,
                posId: 0,
                maxDiscountAmt: 0,
                isVisible: 0,
                termsAndConds: "<html>  <head>  </head> <body> promotion-service@kfc2019</body> </html>"
            }];

            let returnList = testlist.slice(((parseInt(payload.page.toString()) - 1) * 10), (parseInt(payload.page.toString()) * 10))
            return { "list": returnList, "nextPage": testlist[((parseInt(payload.page.toString()) * 10) + 1)] ? parseInt(payload.page.toString()) + 1 : -1, currentPage: parseInt(payload.page.toString()) }
        } catch (err) {
            consolelog(process.cwd(), "getPromotionsList", err, false)
            return Promise.reject(err)
        }
    }
}

export const promotionController = new PromotionController();