'use strict';
import * as Constant from '../constant'
import { BaseEntity } from './base.entity'
import { consolelog, getFrequency } from '../utils'
import * as CMS from "../cms"
import { kafkaService, paymentService, notificationService, userService } from '../grpc/client';
import { OrderSDME } from '../sdm';


export class OrderClass extends BaseEntity {
    constructor() {
        super(Constant.SET_NAME.ORDER)
    }
    /**
    * @method INTERNAL
    * @description Sync order request in KAFKA for creating order on SDM
    */
    async syncOrder(payload: IOrderRequest.IOrderData) {
        try {
            kafkaService.kafkaSync({
                set: this.set,
                sdm: {
                    create: true,
                    argv: JSON.stringify(payload)
                },
                inQ: true
            })
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncOrder", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async createOrderOnCMS(payload: IOrderCMSRequest.ICreateOrderCms, cmsAddressRef: number) {
        try {
            payload['address_id'] = cmsAddressRef
            let cmsOrder = await CMS.OrderCMSE.createOrder(payload)
            return cmsOrder
        } catch (error) {
            consolelog(process.cwd(), "createOrderOnCMS", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    createCEntries(items) {
        try {
            let Entries = {
                CEntry: []
            }
            items.forEach(product => {
                for (let i = 0; i < product.qty; i++) {
                    let instanceId = Math.floor(Math.random() * (999 - 100 + 1) + 100);
                    if (product.originalTypeId == "simple") {
                        if (product.typeId == "simple") {
                            // "name": "Fresh Orange Juice"
                            Entries.CEntry.push({
                                ItemID: product.sdmId,
                                Level: 0,
                                ModCode: "NONE",
                                Name: product.name,
                                OrdrMode: "OM_SAVED",
                                Price: product.specialPrice,
                                Status: "NOTAPPLIED",
                            })
                        } else if (product.typeId == "bundle") {
                            // "name": "Mighty Original",
                            let obj = {
                                DealID: 0,
                                Entries: {
                                    CEntry: []
                                },
                                ID: 0,
                                ItemID: product.sdmId,
                                ModCode: "NONE",
                                Name: product.name,
                                QCComponent: -1,
                                QCInstanceID: instanceId,
                                QCLevel: 0,
                                QCProID: product.promoId,
                            }
                            if (product.bundleProductOptions && product.bundleProductOptions.length > 0) {
                                product.bundleProductOptions.forEach(bpo => {
                                    if (bpo && bpo.productLinks.length > 0) {
                                        bpo.productLinks.forEach(pl => {
                                            if (pl.selected == 1) {
                                                if (pl.subOptions && pl.subOptions.length > 0) {
                                                    pl.subOptions.forEach(so => {
                                                        if (so.selected == 1) {
                                                            if (so.title == "None") { }
                                                            else if (so.title == "Regular") {
                                                                if (so.sdmId)
                                                                    obj.Entries.CEntry.push({
                                                                        ID: 0,
                                                                        ItemID: so.sdmId,
                                                                        ModCode: "WITH",
                                                                        ModgroupID: pl.modGroupId ? pl.modGroupId : -1,
                                                                        Name: so.name,
                                                                        OrdrMode: "OM_SAVED",
                                                                        Weight: 0,
                                                                    })
                                                            } else if (so.title == "Extra") {
                                                                if (so.sdmId)
                                                                    obj.Entries.CEntry.push({
                                                                        ID: 0,
                                                                        ItemID: so.sdmId,
                                                                        ModCode: "WITH",
                                                                        ModgroupID: pl.modGroupId,
                                                                        Name: so.name,
                                                                        OrdrMode: "OM_SAVED",
                                                                        Weight: 0,
                                                                    }, {
                                                                        ID: 0,
                                                                        ItemID: so.sdmId,
                                                                        ModCode: "WITH",
                                                                        ModgroupID: pl.modGroupId,
                                                                        Name: so.name,
                                                                        OrdrMode: "OM_SAVED",
                                                                        Weight: 0,
                                                                    })
                                                            }
                                                        }
                                                    })
                                                }
                                            }
                                        })
                                    }
                                })
                            }
                            Entries.CEntry.push(obj)
                        }
                    }
                    else if (product.originalTypeId == "configurable") {
                        // "name": "Pepsi",
                        if (product.items && product.items.length > 0) {
                            product.items.forEach(i => {
                                if (i['sku'] == product.selectedItem) {
                                    Entries.CEntry.push({
                                        ItemID: i.sdmId,
                                        Level: 0,
                                        ModCode: "NONE",
                                        Name: i.name,
                                        OrdrMode: "OM_SAVED",
                                        Price: i.specialPrice,
                                        Status: "NOTAPPLIED",
                                    })
                                }
                            })
                        }
                    }
                    else if (product.originalTypeId == "bundle") {
                        if (product.typeId == "bundle") {
                            // "name": "Super Mega Deal",
                            if (product.bundleProductOptions && product.bundleProductOptions.length > 0) {
                                product.bundleProductOptions.forEach(bpo => {
                                    let QCComponent = bpo.compId
                                    if (bpo.isDependent == 0 && bpo.productLinks && bpo.productLinks.length > 0) {
                                        bpo.productLinks.forEach(pl => {
                                            if (pl.selected == 1) {
                                                if (pl.dependentSteps && pl.dependentSteps.length > 0) {
                                                    let obj = {
                                                        DealID: 0,
                                                        Entries: {
                                                            CEntry: []
                                                        },
                                                        ID: 0,
                                                        ItemID: pl.sdmId,
                                                        ModCode: "NONE",
                                                        Name: pl.name,
                                                        QCComponent: QCComponent,
                                                        QCInstanceID: instanceId,
                                                        QCLevel: 0,
                                                        QCProID: product.promoId,
                                                    }
                                                    product.bundleProductOptions.forEach(plbpo => {
                                                        if (pl.dependentSteps.indexOf(plbpo.position) >= 0) {
                                                            if (plbpo.type == "stepper") {
                                                                plbpo.productLinks.forEach(plbpopl => {
                                                                    let instanceId2 = Math.floor(Math.random() * (999 - 100 + 1) + 100);
                                                                    for (let i = 0; i < plbpopl.selectionQty; i++) {
                                                                        obj.Entries.CEntry.push({
                                                                            DealID: 0,
                                                                            ID: 0,
                                                                            ItemID: plbpopl.sdmId,
                                                                            ModCode: "NONE",
                                                                            Name: plbpopl.name,
                                                                            QCComponent: QCComponent,
                                                                            QCInstanceID: instanceId2,
                                                                            QCLevel: 0,
                                                                            QCProID: product.promoId,
                                                                        })
                                                                    }
                                                                })
                                                            }
                                                        }
                                                    })
                                                    Entries.CEntry.push(obj)
                                                } else {
                                                    for (let i = 0; i < pl.selectionQty; i++) {
                                                        Entries.CEntry.push({
                                                            DealID: 0,
                                                            ID: 0,
                                                            ItemID: pl.sdmId,
                                                            ModCode: "NONE",
                                                            Name: pl.name,
                                                            QCComponent: QCComponent,
                                                            QCInstanceID: instanceId,
                                                            QCLevel: 0,
                                                            QCProID: product.promoId,
                                                        })
                                                    }
                                                }
                                            }
                                        })
                                    }
                                })
                            }
                        }
                    }
                    else if (product.originalTypeId == "bundle_group") {
                        if (product.typeId == "bundle_group") {
                            // "name": "Twister Meal",   "name": "Mighty Twist",
                            if (product.items && product.items.length > 0) {
                                product.items.forEach(i => {
                                    if (i['sku'] == product.selectedItem) {
                                        if (i.bundleProductOptions && i.bundleProductOptions.length > 0) {
                                            let positionIndex = i.bundleProductOptions[0].position
                                            i.bundleProductOptions.forEach(bpo => {
                                                let QCComponent = bpo.compId
                                                if (bpo.isDependent == 0 && bpo.productLinks && bpo.productLinks.length > 0) {
                                                    if (bpo.ingredient == 0) {
                                                        bpo.productLinks.forEach(pl => {
                                                            if (pl.selected == 1) {
                                                                if (pl.dependentSteps && pl.dependentSteps.length > 0) {
                                                                    let obj = {
                                                                        DealID: 0,
                                                                        Entries: {
                                                                            CEntry: []
                                                                        },
                                                                        ID: 0,
                                                                        ItemID: pl.sdmId,
                                                                        ModCode: "NONE",
                                                                        Name: pl.name,
                                                                        QCComponent: QCComponent,
                                                                        QCInstanceID: instanceId,
                                                                        QCLevel: 0,
                                                                        QCProID: i.promoId,
                                                                    }
                                                                    let dependentSteps = i.bundleProductOptions[(positionIndex == 0) ? pl.dependentSteps[0] : (pl.dependentSteps[0] - 1)]
                                                                    if (dependentSteps.ingredient == 1 || dependentSteps.isModifier == 1) {
                                                                        /**
                                                                         * @description (ingredient == 1) :  "name": "Twister Meal"
                                                                         * @description (isModifier == 1) :  "name": "Mighty Twist"
                                                                         */
                                                                        if (dependentSteps.productLinks && dependentSteps.productLinks.length > 0) {
                                                                            dependentSteps.productLinks.forEach(dspl => {
                                                                                if (dspl.subOptions && dspl.subOptions.length > 0) {
                                                                                    dspl.subOptions.forEach(dsplso => {
                                                                                        if (dsplso.sdmId && dsplso.selected == 1) {
                                                                                            if (dsplso.title == "None") { }
                                                                                            else if (dsplso.title == "Regular") {
                                                                                                obj.Entries.CEntry.push({
                                                                                                    ID: 0,
                                                                                                    ItemID: dsplso.sdmId,
                                                                                                    ModCode: "WITH",
                                                                                                    ModgroupID: dspl.modGroupId ? dspl.modGroupId : -1,
                                                                                                    Name: dspl.name,
                                                                                                    OrdrMode: "OM_SAVED",
                                                                                                    Weight: 0,
                                                                                                })
                                                                                            } else if (dsplso.title == "Extra") {
                                                                                                obj.Entries.CEntry.push({
                                                                                                    ID: 0,
                                                                                                    ItemID: dsplso.sdmId,
                                                                                                    ModCode: "WITH",
                                                                                                    ModgroupID: dspl.modGroupId ? dspl.modGroupId : -1,
                                                                                                    Name: dspl.name,
                                                                                                    OrdrMode: "OM_SAVED",
                                                                                                    Weight: 0,
                                                                                                }, {
                                                                                                    ID: 0,
                                                                                                    ItemID: dsplso.sdmId,
                                                                                                    ModCode: "WITH",
                                                                                                    ModgroupID: dspl.modGroupId ? dspl.modGroupId : -1,
                                                                                                    Name: dspl.name,
                                                                                                    OrdrMode: "OM_SAVED",
                                                                                                    Weight: 0,
                                                                                                })
                                                                                            }
                                                                                        }
                                                                                    })
                                                                                }
                                                                            })
                                                                        }
                                                                        Entries.CEntry.push(obj)
                                                                    } else if (dependentSteps['type'] == "stepper") {
                                                                        /**
                                                                         * @description (type == "stepper") : "name": "Dinner Meal", 
                                                                         */
                                                                        dependentSteps.productLinks.forEach(dspl => {
                                                                            if (dspl.selectionQty > 0) {
                                                                                let count = dspl.selectionQty
                                                                                while (count != 0) {
                                                                                    Entries.CEntry.push({
                                                                                        DealID: 0,
                                                                                        ID: 0,
                                                                                        ItemID: dspl.sdmId,
                                                                                        ModCode: "NONE",
                                                                                        Name: dspl.name,
                                                                                        QCComponent: QCComponent,
                                                                                        QCInstanceID: instanceId,
                                                                                        QCLevel: 0,
                                                                                        QCProID: i.promoId,
                                                                                    })
                                                                                    count = count - 1
                                                                                }
                                                                            }
                                                                        })
                                                                    }
                                                                } else {
                                                                    let count = pl.selectionQty
                                                                    while (count != 0) {
                                                                        Entries.CEntry.push({
                                                                            DealID: 0,
                                                                            ID: 0,
                                                                            ItemID: pl.sdmId,
                                                                            ModCode: "NONE",
                                                                            Name: pl.name,
                                                                            QCComponent: QCComponent,
                                                                            QCInstanceID: instanceId,
                                                                            QCLevel: 0,
                                                                            QCProID: i.promoId,
                                                                        })
                                                                        count = count - 1
                                                                    }
                                                                }
                                                            }
                                                        })
                                                    } else {
                                                        /**
                                                         * @description : if the product does not have dependentstep value but actually is dependent on the next product in the array
                                                         */
                                                        let lastProductAddedInCentry = {
                                                            DealID: Entries.CEntry[Entries.CEntry.length - 1].DealID,
                                                            Entries: {
                                                                CEntry: []
                                                            },
                                                            ID: Entries.CEntry[Entries.CEntry.length - 1].ID,
                                                            ItemID: Entries.CEntry[Entries.CEntry.length - 1].ItemID,
                                                            ModCode: Entries.CEntry[Entries.CEntry.length - 1].ModCode,
                                                            Name: Entries.CEntry[Entries.CEntry.length - 1].Name,
                                                            QCComponent: Entries.CEntry[Entries.CEntry.length - 1].QCComponent,
                                                            QCInstanceID: Entries.CEntry[Entries.CEntry.length - 1].QCInstanceID,
                                                            QCLevel: Entries.CEntry[Entries.CEntry.length - 1].QCLevel,
                                                            QCProID: Entries.CEntry[Entries.CEntry.length - 1].QCProID,
                                                        }
                                                        if (bpo.productLinks && bpo.productLinks.length > 0) {
                                                            bpo.productLinks.forEach(bpopl => {
                                                                if (bpopl.subOptions && bpopl.subOptions.length > 0) {
                                                                    bpopl.subOptions.forEach(bpoplso => {
                                                                        if (bpoplso.sdmId && bpoplso.selected == 1) {
                                                                            if (bpoplso.title == "None") { }
                                                                            else if (bpoplso.title == "Regular") {
                                                                                lastProductAddedInCentry.Entries.CEntry.push({
                                                                                    ID: 0,
                                                                                    ItemID: bpoplso.sdmId,
                                                                                    ModCode: "WITH",
                                                                                    ModgroupID: bpopl.modGroupId ? bpopl.modGroupId : -1,
                                                                                    Name: bpopl.name,
                                                                                    OrdrMode: "OM_SAVED",
                                                                                    Weight: 0,
                                                                                })
                                                                            } else if (bpoplso.title == "Extra") {
                                                                                lastProductAddedInCentry.Entries.CEntry.push({
                                                                                    ID: 0,
                                                                                    ItemID: bpoplso.sdmId,
                                                                                    ModCode: "WITH",
                                                                                    ModgroupID: bpopl.modGroupId ? bpopl.modGroupId : -1,
                                                                                    Name: bpopl.name,
                                                                                    OrdrMode: "OM_SAVED",
                                                                                    Weight: 0,
                                                                                }, {
                                                                                    ID: 0,
                                                                                    ItemID: bpoplso.sdmId,
                                                                                    ModCode: "WITH",
                                                                                    ModgroupID: bpopl.modGroupId ? bpopl.modGroupId : -1,
                                                                                    Name: bpopl.name,
                                                                                    OrdrMode: "OM_SAVED",
                                                                                    Weight: 0,
                                                                                })
                                                                            }
                                                                        }
                                                                    })
                                                                }
                                                            })
                                                        }
                                                        Entries.CEntry[Entries.CEntry.length - 1] = { ...lastProductAddedInCentry }
                                                    }
                                                }
                                            })
                                        }
                                    }
                                })
                            }
                        }
                        else if (product.typeId == "bundle") {
                            // "name": "Bucket 15 Pcs",
                            if (product.bundleProductOptions && product.bundleProductOptions.length > 0) {
                                let positionIndex = product.bundleProductOptions[0].position
                                product.bundleProductOptions.forEach(bpo => {
                                    let QCComponent = bpo.compId
                                    if (bpo.isDependent == 0 && bpo.productLinks && bpo.productLinks.length > 0) {
                                        bpo.productLinks.forEach(pl => {
                                            if (pl.selected == 1) {
                                                if (pl.dependentSteps && pl.dependentSteps.length > 0) {
                                                    let dependentSteps = product.bundleProductOptions[(positionIndex == 0) ? pl.dependentSteps[0] : (pl.dependentSteps[0] - 1)]
                                                    if (dependentSteps.position == pl.dependentSteps[0]) {
                                                        if (dependentSteps.type == "stepper") {
                                                            dependentSteps.productLinks.forEach(dspl => {
                                                                if (dspl.selectionQty > 0) {
                                                                    let count = dspl.selectionQty
                                                                    while (count != 0) {
                                                                        Entries.CEntry.push({
                                                                            DealID: 0,
                                                                            ID: 0,
                                                                            ItemID: dspl.sdmId,
                                                                            ModCode: "NONE",
                                                                            Name: dspl.name,
                                                                            QCComponent: QCComponent,
                                                                            QCInstanceID: instanceId,
                                                                            QCLevel: 0,
                                                                            QCProID: product.promoId,
                                                                        })
                                                                        count = count - 1
                                                                    }
                                                                }
                                                            })
                                                        }
                                                    }
                                                } else {
                                                    let count = pl.selectionQty
                                                    while (count != 0) {
                                                        Entries.CEntry.push({
                                                            DealID: 0,
                                                            ID: 0,
                                                            ItemID: pl.sdmId,
                                                            ModCode: "NONE",
                                                            Name: pl.name,
                                                            QCComponent: QCComponent,
                                                            QCInstanceID: instanceId,
                                                            QCLevel: 0,
                                                            QCProID: product.promoId,
                                                        })
                                                        count = count - 1
                                                    }
                                                }
                                            }
                                        })
                                    }
                                })
                            }
                        }
                    }
                }
            })
            return Entries
        } catch (error) {
            consolelog(process.cwd(), "createCEntries", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
    * @method GRPC
    * @description : Create order on SDM
    * */
    async createSdmOrder(payload: IOrderRequest.IOrderData) {
        try {
            let Comps
            if (payload.promo &&
                payload.promo.couponId &&
                payload.promo.couponCode &&
                payload.promo.posId &&
                !payload.isFreeItem
            ) {
                let discountAmount = payload.amount.filter(obj => { return obj.type == Constant.DATABASE.TYPE.CART_AMOUNT.TYPE.DISCOUNT })
                Comps = {
                    KeyValueOfdecimalCCompkckD9yn_P: {
                        Key: payload.promo.posId,
                        Value: {
                            Amount: discountAmount[0].amount,
                            CompID: payload.promo.posId,
                            EnterAmount: discountAmount[0].amount,
                            Name: payload.promo.couponCode
                        }
                    }
                }
            }
            let order = {
                AddressID: payload.address.sdmAddressRef,
                Comps: Comps,
                // AreaID: "",//payload.address.areaId
                // CityID: "",//payload.address.areaId
                ConceptID: Constant.SERVER.SDM.CONCEPT_ID,
                CountryID: 1,//payload.store.countryId
                CustomerID: payload.sdmUserRef,
                // DateOfTrans: "",
                DeliveryChargeID: 279,
                DistrictID: -1,
                // DueTime: "",
                Entries: this.createCEntries(payload.items),
                OrderID: 0,
                OrderMode: (payload['orderType'] == Constant.DATABASE.TYPE.ORDER.DELIVERY) ? 1 : 2,
                OrderType: 0,
                ProvinceID: 7,
                StoreID: payload.address.storeId,
                StreetID: 315
            }
            /**
             * @step 1 :create order on sdm 
             * @step 2 :update mongo order using payload.cartUnique sdmOrderRef
             */
            let data: IOrderSdmRequest.ICreateOrder = {
                licenseCode: Constant.SERVER.SDM.LICENSE_CODE,
                language: "en",
                conceptID: Constant.SERVER.SDM.CONCEPT_ID,
                order: order,
                autoApprove: true,
                useBackupStoreIfAvailable: true,
                orderNotes1: (process.env.NODE_ENV == "development") ? "Test Orders - Appinventiv " + payload.cmsOrderRef : payload.cmsOrderRef,
                orderNotes2: (process.env.NODE_ENV == "development") ? "Test Orders - Appinventiv " + payload._id : payload._id,
                creditCardPaymentbool: (payload['payment']['paymentMethodId'] == Constant.DATABASE.TYPE.PAYMENT_METHOD_ID.COD) ? false : true,
                isSuspended: (payload['payment']['paymentMethodId'] == Constant.DATABASE.TYPE.PAYMENT_METHOD_ID.COD) ? false : true,
                menuTemplateID: 17,
            }
            let createOrder = await OrderSDME.createOrder(data)
            console.log("create order", createOrder, typeof createOrder)
            if (createOrder && typeof createOrder == 'string') {
                let order = await this.updateOneEntityMdb({ cartUnique: payload.cartUnique }, {
                    orderId: createOrder,
                    sdmOrderRef: createOrder,
                    isActive: 1,
                    updatedAt: new Date().getTime()
                }, { new: true })
                CMS.OrderCMSE.updateOrder({
                    order_id: order.cmsOrderRef,
                    payment_status: "",
                    order_status: "",
                    sdm_order_id: order.sdmOrderRef
                })
                if (order && order._id) {
                    this.getSdmOrder({
                        sdmOrderRef: order.sdmOrderRef,
                        language: order.language,
                        timeInterval: getFrequency({
                            status: order.status,
                            type: Constant.DATABASE.TYPE.FREQ_TYPE.GET,
                            prevTimeInterval: 0,
                            statusChanged: false
                        }).nextPingMs
                    })
                }
                return {}
            } else {
                let order = await this.updateOneEntityMdb({ cartUnique: payload.cartUnique }, {
                    isActive: 0,
                    status: Constant.DATABASE.STATUS.ORDER.FAILURE.MONGO,
                    updatedAt: new Date().getTime(),
                    sdmOrderStatus: -2,
                    validationRemarks: createOrder.ResultText
                });
                CMS.OrderCMSE.updateOrder({
                    order_id: order.cmsOrderRef,
                    payment_status: Constant.DATABASE.STATUS.PAYMENT.FAILED,
                    order_status: Constant.DATABASE.STATUS.ORDER.FAILURE.CMS,
                    sdm_order_id: order.sdmOrderRef
                })
                // send notification(sms + email) on order cancellation
                let userData = await userService.fetchUser({ userId: payload.userId });
                notificationService.sendNotification({
                    toSendMsg: true,
                    msgCode: Constant.NOTIFICATION_CODE.SMS.ORDER_FAIL,
                    msgDestination: `${userData.cCode}${userData.phnNo}`,
                    toSendEmail: true,
                    emailCode: Constant.NOTIFICATION_CODE.EMAIL.ORDER_FAIL,
                    emailDestination: userData.email,
                    language: payload.language,
                    payload: JSON.stringify({ msg: order, email: { order } })
                });

                return Promise.reject(Constant.STATUS_MSG.ERROR.E500.CREATE_ORDER_ERROR)
            }
        } catch (error) {
            consolelog(process.cwd(), "createSdmOrder", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
    * @method INTERNAL
    * */
    async createOrder(
        headers: ICommonRequest.IHeaders,
        cmsOrderRef: number,
        cartData: ICartRequest.ICartData,
        address: IUserGrpcRequest.IFetchAddressRes,
        store: IStoreGrpcRequest.IStore,
        userData: IUserRequest.IUserData) {
        try {
            console.log("cartDaTa", cartData)
            let amount = cartData.amount
            if (address.addressType == Constant.DATABASE.TYPE.ORDER.PICKUP) {
                amount = amount.filter(obj => { return obj.type != Constant.DATABASE.TYPE.CART_AMOUNT.TYPE.SHIPPING })
            }
            let items = cartData.items
            if (headers.language == Constant.DATABASE.LANGUAGE.EN)
                items = items.concat(cartData.selFreeItem.en)
            else
                items = items.concat(cartData.selFreeItem.ar)
            let orderData = {
                orderType: address.addressType,
                cartId: cartData.cartId,
                cartUnique: cartData.cartUnique,
                cmsCartRef: cartData.cmsCartRef,
                sdmOrderRef: 0,
                cmsOrderRef: cmsOrderRef,
                userId: cartData.userId,
                sdmUserRef: userData.sdmUserRef,
                country: headers.country,
                language: headers.language,
                status: Constant.DATABASE.STATUS.ORDER.PENDING.MONGO,
                sdmOrderStatus: -1,
                items: items,
                amount: amount,
                vat: cartData.vat,
                address: {
                    addressId: address.id,
                    sdmAddressRef: address.sdmAddressRef,
                    cmsAddressRef: address.cmsAddressRef,
                    tag: address.tag,
                    bldgName: address.bldgName,
                    description: address.description,
                    flatNum: address.flatNum,
                    addressType: address.addressType,
                    lat: address.lat,
                    lng: address.lng,
                    countryId: address.countryId,
                    areaId: address.areaId,
                    cityId: address.cityId,
                    storeId: address.storeId
                },
                store: {
                    storeId: store.storeId,
                    countryId: store.countryId,
                    areaId: store.areaId,
                    cityId: store.cityId ? store.cityId : 17,
                    location: store.location,
                    address_en: store.address_en,
                    address_ar: store.address_ar,
                    name_en: store.name_en,
                    name_ar: store.name_ar
                },
                payment: {},
                transLogs: [],
                createdAt: new Date().getTime(),
                updatedAt: new Date().getTime(),
                trackUntil: 0,
                isActive: 1,
                changePaymentMode: 0,
                paymentMethodAddedOnSdm: 0,
                amountValidationPassed: false,
                orderConfirmationNotified: false
            }
            if (cartData.promo && cartData.promo.couponId) {
                orderData['promo'] = cartData.promo
            } else
                orderData['promo'] = {}
            if (cartData.selFreeItem && cartData.selFreeItem.ar && cartData.selFreeItem.ar.length > 0)
                orderData['isFreeItem'] = true
            let order: IOrderRequest.IOrderData = await this.createOneEntityMdb(orderData)
            return order
        } catch (error) {
            consolelog(process.cwd(), "createOrder", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
    * @method GRPC
    * @param {string} sdmOrderRef : sdm order id
    * @param {number} timeInterval : set timeout interval
    * */
    async getSdmOrder(payload: IOrderRequest.IGetSdmOrder) {
        try {
            setTimeout(async () => {
                let recheck = true
                let statusChanged = false
                let order = await this.getOneEntityMdb({ sdmOrderRef: payload.sdmOrderRef }, { items: 0, selFreeItem: 0, freeItems: 0 })
                if (order && order._id) {
                    let oldSdmStatus = order.sdmOrderStatus
                    console.log(`old sdm status : ${oldSdmStatus}`)
                    if ((order.createdAt + (30 * 60 * 60 * 1000)) < new Date().getTime()) {
                        console.log(`stop fetching order detail from sdm after 30 mins : ${new Date()}`)
                        recheck = false
                    }
                    if (recheck) {
                        if (order.sdmOrderRef && order.sdmOrderRef != 0) {
                            consolelog(process.cwd(), "SDM ORDER DETAIL 1:       ", order.sdmOrderStatus, true)
                            let sdmOrder = await OrderSDME.getOrderDetail({ sdmOrderRef: order.sdmOrderRef, language: order.language })
                            consolelog(process.cwd(), "SDM ORDER DETAIL 2:       ", order.sdmOrderStatus, true)
                            if (sdmOrder.Status && typeof sdmOrder.Status) {
                                order = await this.updateOneEntityMdb({ _id: order._id }, {
                                    updatedAt: new Date().getTime(),
                                    sdmOrderStatus: parseInt(sdmOrder.Status)
                                }, { new: true })
                                if (oldSdmStatus != parseInt(sdmOrder.Status))
                                    statusChanged = true

                                if (!order.amountValidationPassed && recheck && sdmOrder.Total) {
                                    let amountValidation = await this.amountValidationHandler(recheck, order, sdmOrder)
                                    recheck = amountValidation.recheck;
                                    order = amountValidation.order;
                                }

                                let remarksValidation = await this.validationRemarksHandler(recheck, order, sdmOrder)
                                recheck = remarksValidation.recheck;
                                order = remarksValidation.order;

                                if (recheck && sdmOrder && sdmOrder.OrderID) {
                                    switch (parseInt(sdmOrder.Status)) {
                                        case 0:
                                        case 96:
                                        case 1: {
                                            let pendingHandler = await this.sdmPendingOrderHandler(recheck, oldSdmStatus, order, sdmOrder)
                                            recheck = pendingHandler.recheck;
                                            order = pendingHandler.order;
                                            break;
                                        }
                                        case 2: {
                                            let confirmedHandler = await this.sdmConfirmedHandler(recheck, oldSdmStatus, order, sdmOrder)
                                            recheck = confirmedHandler.recheck;
                                            order = confirmedHandler.order;
                                            break;
                                        }
                                        case 8: {
                                            let readyHandler = await this.sdmReadyHandler(recheck, oldSdmStatus, order, sdmOrder)
                                            recheck = readyHandler.recheck;
                                            order = readyHandler.order;
                                            break;
                                        }
                                        case 16:
                                        case 32: {
                                            let onTheWayHandler = await this.sdmOnTheWayHandler(recheck, oldSdmStatus, order, sdmOrder)
                                            recheck = onTheWayHandler.recheck;
                                            order = onTheWayHandler.order;
                                            break;
                                        }
                                        case 64:
                                        case 128:
                                        case 2048: {
                                            let deliveredHandler = await this.sdmDeliveredHandler(recheck, oldSdmStatus, order, sdmOrder)
                                            recheck = deliveredHandler.recheck;
                                            order = deliveredHandler.order;
                                            break;
                                        }
                                        case 256:
                                        case 512:
                                        case 1024:
                                        case 4096:
                                        case 8192: {
                                            let cancelledHandler = await this.sdmCancelledHandler(recheck, oldSdmStatus, order, sdmOrder)
                                            recheck = cancelledHandler.recheck;
                                            order = cancelledHandler.order;
                                            break;
                                        }
                                        default: {
                                            recheck = false
                                            consolelog(process.cwd(), `UNHANDLED SDM ORDER STATUS for orderId : ${parseInt(sdmOrder.Status)} : `, parseInt(sdmOrder.Status), true)
                                            break;
                                        }
                                    }
                                }

                                if (order.status == Constant.DATABASE.STATUS.ORDER.PENDING.MONGO &&
                                    (order.createdAt + Constant.SERVER.MAX_PENDING_STATE_TIME) < new Date().getTime()) {
                                    recheck = false
                                    order = await this.maxPendingReachedHandler(order);
                                }
                                if (payload.timeInterval != 0 && recheck)
                                    payload.timeInterval = getFrequency({
                                        status: order.status,
                                        type: Constant.DATABASE.TYPE.FREQ_TYPE.GET,
                                        prevTimeInterval: payload.timeInterval,
                                        statusChanged: statusChanged
                                    }).nextPingMs
                                else
                                    recheck = false
                            } else
                                recheck = false

                            console.log(`final orderstatus: ${order.status}, recheck: ${recheck}, timeInterval: ${payload.timeInterval}`)
                            if (recheck) {
                                kafkaService.kafkaSync({
                                    set: this.set,
                                    sdm: {
                                        get: true,
                                        argv: JSON.stringify(payload)
                                    },
                                    inQ: true
                                })
                            }
                        }
                    }
                }
            }, payload.timeInterval)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "getSdmOrder", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async amountValidationHandler(recheck: boolean, order: IOrderRequest.IOrderData, sdmOrder) {
        try {
            console.log("Amount validation check order mode", sdmOrder.OrderMode)
            let totalAmount = order.amount.filter(obj => { return obj.type == Constant.DATABASE.TYPE.CART_AMOUNT.TYPE.TOTAL })
            let amountToCompare = totalAmount[0].amount
            console.log(`amountValidationHandler 1 : totalAmount : ${totalAmount[0].amount}, sdmTotal : ${sdmOrder.Total}`)
            if (sdmOrder.OrderMode == "1") {
                /**
                 *@description Delivery order
                 */
                let deliveryCharge = order.amount.filter(obj => { return obj.type == Constant.DATABASE.TYPE.CART_AMOUNT.TYPE.SHIPPING })
                console.log(`amountValidationHandler 2 : deliveryCharge : ${deliveryCharge}`)
                amountToCompare = amountToCompare - deliveryCharge[0].amount
            }
            console.log(`amountValidationHandler 3 : amountToCompare : ${amountToCompare}, sdmOrder.Total : ${sdmOrder.Total}`)

            if (
                ((sdmOrder.OrderMode == "1") && (amountToCompare == parseFloat(sdmOrder.Total) || totalAmount[0].amount == parseFloat(sdmOrder.Total))) ||
                ((sdmOrder.OrderMode == "2") && (amountToCompare == parseFloat(sdmOrder.Total)))
            ) {
                order = await this.updateOneEntityMdb({ _id: order._id }, { amountValidationPassed: true }, { new: true })
            } else {
                console.log(`amountValidationHandler 4`)
                recheck = false
                OrderSDME.cancelOrder({
                    sdmOrderRef: order.sdmOrderRef,
                    voidReason: 1,
                    validationRemarks: Constant.STATUS_MSG.SDM_ORDER_VALIDATION.ORDER_AMOUNT_MISMATCH,
                    language: order.language
                })
                if (order.payment.paymentMethodId == Constant.DATABASE.TYPE.PAYMENT_METHOD_ID.COD) {
                    console.log(`amountValidationHandler 5`)
                    order = await this.updateOneEntityMdb({ _id: order._id }, {
                        isActive: 0,
                        status: Constant.DATABASE.STATUS.ORDER.FAILURE.MONGO,
                        updatedAt: new Date().getTime(),
                        validationRemarks: Constant.STATUS_MSG.SDM_ORDER_VALIDATION.ORDER_AMOUNT_MISMATCH,
                    }, { new: true })
                    CMS.OrderCMSE.updateOrder({
                        order_id: order.cmsOrderRef,
                        payment_status: Constant.DATABASE.STATUS.TRANSACTION.VOID_AUTHORIZATION.AS,
                        order_status: Constant.DATABASE.STATUS.ORDER.FAILURE.CMS,
                        sdm_order_id: order.sdmOrderRef
                    })
                } else {
                    console.log(`amountValidationHandler 6`)
                    let transLogs = [];
                    let reverseStatus;
                    try {
                        await paymentService.reversePayment({
                            noonpayOrderId: parseInt(order.transLogs[1].noonpayOrderId),
                            storeCode: Constant.DATABASE.STORE_CODE.MAIN_WEB_STORE
                        })
                    } catch (revError) {
                        if (revError.data) {
                            if (revError.data.actionHint == Constant.DATABASE.TYPE.PAYMENT_ACTION_HINTS.STATUS_USING_NOONPAY_ID) {
                                transLogs.push(revError.data)
                            } else if (revError.data.actionHint == Constant.DATABASE.TYPE.PAYMENT_ACTION_HINTS.SYNC_CONFIGURATION) {
                                transLogs.push(revError.data)
                            } else {
                                consolelog(process.cwd(), "unhandled payment error reverse", "", false)
                            }
                        }
                    }
                    try {
                        reverseStatus = await paymentService.getPaymentStatus({
                            noonpayOrderId: parseInt(order.transLogs[1].noonpayOrderId),
                            storeCode: Constant.DATABASE.STORE_CODE.MAIN_WEB_STORE,
                            paymentStatus: Constant.DATABASE.STATUS.PAYMENT.CANCELLED,
                        })
                        transLogs.push(reverseStatus)
                    } catch (statusError) {
                        if (statusError.data) {
                            if (statusError.data.actionHint == Constant.DATABASE.TYPE.PAYMENT_ACTION_HINTS.STATUS_USING_NOONPAY_ID) {
                                transLogs.push(statusError.data)
                            } else if (statusError.data.actionHint == Constant.DATABASE.TYPE.PAYMENT_ACTION_HINTS.SYNC_CONFIGURATION) {
                                transLogs.push(statusError.data)
                            } else {
                                consolelog(process.cwd(), "unhandled payment error reverse status", "", false)
                            }
                        }
                    }
                    let dataToUpdateOrder = {
                        isActive: 0,
                        status: Constant.DATABASE.STATUS.ORDER.FAILURE.MONGO,
                        updatedAt: new Date().getTime(),
                        validationRemarks: Constant.STATUS_MSG.SDM_ORDER_VALIDATION.ORDER_AMOUNT_MISMATCH,
                        "payment.status": Constant.DATABASE.STATUS.TRANSACTION.VOID_AUTHORIZATION.AS
                    }
                    if (transLogs && transLogs.length > 0)
                        dataToUpdateOrder['$addToSet'] = {
                            transLogs: { $each: transLogs.reverse() }
                        }
                    order = await this.updateOneEntityMdb({ _id: order._id }, dataToUpdateOrder, { new: true })
                    if (reverseStatus && order && order._id) {
                        CMS.TransactionCMSE.createTransaction({
                            order_id: order.cmsOrderRef,
                            message: reverseStatus.transactions[0].type,
                            type: Constant.DATABASE.STATUS.TRANSACTION.VOID_AUTHORIZATION.CMS,
                            payment_data: {
                                id: reverseStatus.transactions[0].id.toString(),
                                data: JSON.stringify(reverseStatus)
                            }
                        })
                        CMS.OrderCMSE.updateOrder({
                            order_id: order.cmsOrderRef,
                            payment_status: Constant.DATABASE.STATUS.TRANSACTION.VOID_AUTHORIZATION.AS,
                            order_status: Constant.DATABASE.STATUS.ORDER.FAILURE.CMS,
                            sdm_order_id: order.sdmOrderRef
                        })
                    }
                }
            }

            return { recheck, order }
        } catch (error) {
            consolelog(process.cwd(), "amountValidationHandler", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async validationRemarksHandler(recheck: boolean, order: IOrderRequest.IOrderData, sdmOrder) {
        try {
            console.log("validation remarks check ", sdmOrder.ValidationRemarks)
            if (recheck && sdmOrder.ValidationRemarks &&
                (sdmOrder.ValidationRemarks != null || sdmOrder.ValidationRemarks != "null") &&
                sdmOrder.ValidationRemarks != Constant.STATUS_MSG.SDM_ORDER_VALIDATION.EXCEED_ORDER_AMOUNT
            ) {
                console.log(`validationRemarksHandler 1`)
                recheck = false
                order = await this.updateOneEntityMdb({ _id: order._id }, {
                    isActive: 0,
                    status: Constant.DATABASE.STATUS.ORDER.FAILURE.MONGO,
                    updatedAt: new Date().getTime(),
                    validationRemarks: sdmOrder.ValidationRemarks
                }, { new: true })
                CMS.OrderCMSE.updateOrder({
                    order_id: order.cmsOrderRef,
                    payment_status: Constant.DATABASE.STATUS.PAYMENT.FAILED,
                    order_status: Constant.DATABASE.STATUS.ORDER.FAILURE.CMS,
                    sdm_order_id: order.sdmOrderRef
                });

                // send notification(sms + email) on order failure
                let userData = await userService.fetchUser({ userId: order.userId });
                notificationService.sendNotification({
                    toSendMsg: true,
                    msgCode: Constant.NOTIFICATION_CODE.SMS.ORDER_FAIL,
                    msgDestination: `${userData.cCode}${userData.phnNo}`,
                    toSendEmail: true,
                    emailCode: Constant.NOTIFICATION_CODE.EMAIL.ORDER_FAIL,
                    emailDestination: userData.email,
                    language: order.language,
                    payload: JSON.stringify({ msg: order, email: { order } })
                });
            }
            return { recheck, order }
        } catch (error) {
            consolelog(process.cwd(), "validationRemarksHandler", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async maxPendingReachedHandler(order: IOrderRequest.IOrderData) {
        try {
            let dataToUpdateOrder = {
                isActive: 0,
                status: Constant.DATABASE.STATUS.ORDER.FAILURE.MONGO,
                updatedAt: new Date().getTime(),
                sdmOrderStatus: -2,
                validationRemarks: Constant.STATUS_MSG.SDM_ORDER_VALIDATION.MAX_PENDING_TIME_REACHED
            }
            OrderSDME.cancelOrder({
                sdmOrderRef: order.sdmOrderRef,
                voidReason: 1,
                validationRemarks: Constant.STATUS_MSG.SDM_ORDER_VALIDATION.MAX_PENDING_TIME_REACHED,
                language: order.language
            })
            if (order.payment && order.payment.paymentMethodId == Constant.DATABASE.TYPE.PAYMENT_METHOD_ID.COD) {
                order = await this.updateOneEntityMdb({ _id: order._id }, dataToUpdateOrder, { new: true })
                CMS.OrderCMSE.updateOrder({
                    order_id: order.cmsOrderRef,
                    payment_status: Constant.DATABASE.STATUS.TRANSACTION.VOID_AUTHORIZATION.AS,
                    order_status: Constant.DATABASE.STATUS.ORDER.FAILURE.CMS,
                    sdm_order_id: order.sdmOrderRef
                })
            } else {
                dataToUpdateOrder['payment.status'] = Constant.DATABASE.STATUS.TRANSACTION.VOID_AUTHORIZATION.AS
                let transLogs = [];
                let reverseStatus;
                if (order.payment && order.payment.status && order.payment.status != Constant.DATABASE.STATUS.TRANSACTION.VOID_AUTHORIZATION.AS) {
                    try {
                        await paymentService.reversePayment({
                            noonpayOrderId: parseInt(order.transLogs[1].noonpayOrderId),
                            storeCode: Constant.DATABASE.STORE_CODE.MAIN_WEB_STORE
                        })
                    } catch (revError) {
                        if (revError.data) {
                            if (revError.data.actionHint == Constant.DATABASE.TYPE.PAYMENT_ACTION_HINTS.STATUS_USING_NOONPAY_ID) {
                                transLogs.push(revError.data)
                            } else if (revError.data.actionHint == Constant.DATABASE.TYPE.PAYMENT_ACTION_HINTS.SYNC_CONFIGURATION) {
                                transLogs.push(revError.data)
                            } else {
                                consolelog(process.cwd(), "unhandled payment error reverse", "", false)
                            }
                        }
                    }
                    try {
                        reverseStatus = await paymentService.getPaymentStatus({
                            noonpayOrderId: parseInt(order.transLogs[1].noonpayOrderId),
                            storeCode: Constant.DATABASE.STORE_CODE.MAIN_WEB_STORE,
                            paymentStatus: Constant.DATABASE.STATUS.PAYMENT.CANCELLED,
                        })
                        transLogs.push(reverseStatus)
                    } catch (statusError) {
                        if (statusError.data) {
                            if (statusError.data.actionHint == Constant.DATABASE.TYPE.PAYMENT_ACTION_HINTS.STATUS_USING_NOONPAY_ID) {
                                transLogs.push(statusError.data)
                            } else if (statusError.data.actionHint == Constant.DATABASE.TYPE.PAYMENT_ACTION_HINTS.SYNC_CONFIGURATION) {
                                transLogs.push(statusError.data)
                            } else {
                                consolelog(process.cwd(), "unhandled payment error reverse status", "", false)
                            }
                        }
                    }
                    if (transLogs && transLogs.length > 0)
                        dataToUpdateOrder['$addToSet'] = {
                            transLogs: { $each: transLogs.reverse() }
                        }
                }
                if (reverseStatus && order && order._id) {
                    CMS.OrderCMSE.updateOrder({
                        order_id: order.cmsOrderRef,
                        payment_status: Constant.DATABASE.STATUS.TRANSACTION.VOID_AUTHORIZATION.AS,
                        order_status: Constant.DATABASE.STATUS.ORDER.FAILURE.CMS,
                        sdm_order_id: order.sdmOrderRef
                    })
                    CMS.TransactionCMSE.createTransaction({
                        order_id: order.cmsOrderRef,
                        message: reverseStatus.transactions[0].type,
                        type: Constant.DATABASE.STATUS.TRANSACTION.VOID_AUTHORIZATION.CMS,
                        payment_data: {
                            id: reverseStatus.transactions[0].id.toString(),
                            data: JSON.stringify(reverseStatus)
                        }
                    })
                }
            }
            order = await this.updateOneEntityMdb({ _id: order._id }, dataToUpdateOrder, { new: true })
            if (order && order._id)
                return order
            else
                return {}
        } catch (error) {
            consolelog(process.cwd(), "maxPendingReachedHandler", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async sdmPendingOrderHandler(recheck: boolean, oldSdmStatus: number, order: IOrderRequest.IOrderData, sdmOrder) {
        try {
            console.log(` PENDING : current sdm status : ${sdmOrder.Status}, old sdm status : ${oldSdmStatus}`)
            if (oldSdmStatus != parseInt(sdmOrder.Status)) {
                if (order.payment.paymentMethodId == Constant.DATABASE.TYPE.PAYMENT_METHOD_ID.CARD) {
                    consolelog(process.cwd(), "PENDING 1:       ", parseInt(sdmOrder.Status), true)
                    if (parseInt(sdmOrder.Status) == 96) {
                        consolelog(process.cwd(), "PENDING 2:       ", parseInt(sdmOrder.Status), true)
                        if (order.payment && order.payment.status == Constant.DATABASE.STATUS.TRANSACTION.AUTHORIZATION.AS) {
                            consolelog(process.cwd(), "PENDING 3:       ", parseInt(sdmOrder.Status), true)
                            if (order.paymentMethodAddedOnSdm == 0) {
                                consolelog(process.cwd(), "PENDING 4:       ", parseInt(sdmOrder.Status), true)
                                /**
                                * @description : add payment object to sdm
                                */
                                let paymentObjAdded = await OrderSDME.processCreditCardOnSdm({
                                    sdmOrderRef: order.sdmOrderRef,
                                    transaction: order.transLogs[1],
                                    language: order.language
                                })
                                if (paymentObjAdded) {
                                    consolelog(process.cwd(), "PENDING 5:       ", parseInt(sdmOrder.Status), true)
                                    order = await this.updateOneEntityMdb({ _id: order._id }, {
                                        paymentMethodAddedOnSdm: 1,
                                        updatedAt: new Date().getTime(),
                                    }, { new: true })
                                }
                                else {
                                    consolelog(process.cwd(), "PENDING 6:       ", parseInt(sdmOrder.Status), true)
                                    /**
                                    * @description : in case of failure while adding payment object
                                    */
                                    recheck = false
                                    order = await this.updateOneEntityMdb({ _id: order._id }, {
                                        status: Constant.DATABASE.STATUS.ORDER.FAILURE.MONGO,
                                        changePaymentMode: true,
                                        updatedAt: new Date().getTime(),
                                    }, { new: true })

                                    CMS.OrderCMSE.updateOrder({
                                        order_id: order.cmsOrderRef,
                                        payment_status: Constant.DATABASE.STATUS.PAYMENT.FAILED,
                                        order_status: Constant.DATABASE.STATUS.ORDER.FAILURE.CMS,
                                        sdm_order_id: order.sdmOrderRef
                                    });

                                    // send notification(sms + email) on order failure
                                    let userData = await userService.fetchUser({ userId: order.userId });
                                    notificationService.sendNotification({
                                        toSendMsg: true,
                                        msgCode: Constant.NOTIFICATION_CODE.SMS.ORDER_FAIL,
                                        msgDestination: `${userData.cCode}${userData.phnNo}`,
                                        toSendEmail: true,
                                        emailCode: Constant.NOTIFICATION_CODE.EMAIL.ORDER_FAIL,
                                        emailDestination: userData.email,
                                        language: order.language,
                                        payload: JSON.stringify({ msg: order, email: { order } })
                                    });
                                }
                            }
                        }
                    }
                    else if (parseInt(sdmOrder.Status) == 0) {
                        consolelog(process.cwd(), "PENDING 7:       ", parseInt(sdmOrder.Status), true)
                    }
                }
                if (!order.orderConfirmationNotified) {
                    let isDelivery = order.orderType === Constant.DATABASE.TYPE.ORDER.DELIVERY;
                    let userData = await userService.fetchUser({ userId: order.userId });
                    notificationService.sendNotification({
                        toSendMsg: true,
                        toSendEmail: true,
                        msgCode: isDelivery ? Constant.NOTIFICATION_CODE.SMS.ORDER_DELIVERY_CONFIRM
                            : Constant.NOTIFICATION_CODE.SMS.ORDER_PICKUP_CONFIRM,
                        emailCode: isDelivery ? Constant.NOTIFICATION_CODE.EMAIL.ORDER_DELIVERY_CONFIRM
                            : Constant.NOTIFICATION_CODE.EMAIL.ORDER_PICKUP_CONFIRM,
                        msgDestination: `${userData.cCode}${userData.phnNo}`,
                        emailDestination: userData.email,
                        language: order.language,
                        payload: JSON.stringify({ msg: order, email: { order } })
                    });
                    order = await this.updateOneEntityMdb({ _id: order._id }, { orderConfirmationNotified: true }, { new: true })
                }
            }

            return { recheck, order }
        } catch (error) {
            consolelog(process.cwd(), "sdmPendingOrderHandler", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async sdmConfirmedHandler(recheck: boolean, oldSdmStatus: number, order: IOrderRequest.IOrderData, sdmOrder) {
        try {
            console.log(` CONFIRMED : current sdm status : ${sdmOrder.Status}, old sdm status : ${oldSdmStatus}`)
            if ((oldSdmStatus < parseInt(sdmOrder.Status)) && (oldSdmStatus != parseInt(sdmOrder.Status))) {
                consolelog(process.cwd(), "CONFIRMED 1 :       ", parseInt(sdmOrder.Status), true)
                if (order.payment.paymentMethodId == Constant.DATABASE.TYPE.PAYMENT_METHOD_ID.COD) {
                    consolelog(process.cwd(), "CONFIRMED 2 :       ", parseInt(sdmOrder.Status), true)
                    order = await this.updateOneEntityMdb({ _id: order._id }, {
                        status: Constant.DATABASE.STATUS.ORDER.CONFIRMED.MONGO,
                        updatedAt: new Date().getTime(),
                    }, { new: true })

                    setTimeout(async () => {
                        order = await this.updateOneEntityMdb({ _id: order._id }, {
                            status: Constant.DATABASE.STATUS.ORDER.BEING_PREPARED.MONGO,
                            updatedAt: new Date().getTime(),
                        }, { new: true })

                        CMS.OrderCMSE.updateOrder({
                            order_id: order.cmsOrderRef,
                            payment_status: Constant.DATABASE.STATUS.PAYMENT.CAPTURED,
                            order_status: Constant.DATABASE.STATUS.ORDER.BEING_PREPARED.CMS,
                            sdm_order_id: order.sdmOrderRef
                        })
                    }, 10000)
                } else {
                    consolelog(process.cwd(), "CONFIRMED 3 :       ", parseInt(sdmOrder.Status), true)
                    if (order.payment.status == Constant.DATABASE.STATUS.TRANSACTION.AUTHORIZATION.AS) {
                        consolelog(process.cwd(), "CONFIRMED 4 :       ", parseInt(sdmOrder.Status), true)
                        order = await this.updateOneEntityMdb({ _id: order._id }, {
                            status: Constant.DATABASE.STATUS.ORDER.CONFIRMED.MONGO,
                            updatedAt: new Date().getTime(),
                        }, { new: true })
                        let transLogs = [];
                        let captureStatus;
                        try {
                            await paymentService.capturePayment({
                                noonpayOrderId: parseInt(order.transLogs[1].noonpayOrderId),
                                orderId: order.transLogs[1].orderId,
                                amount: order.transLogs[1].amount,
                                storeCode: Constant.DATABASE.STORE_CODE.MAIN_WEB_STORE
                            })
                        } catch (captureError) {
                            if (captureError.data) {
                                if (captureError.data.actionHint == Constant.DATABASE.TYPE.PAYMENT_ACTION_HINTS.STATUS_USING_NOONPAY_ID) {
                                    transLogs.push(captureError.data)
                                } else if (captureError.data.actionHint == Constant.DATABASE.TYPE.PAYMENT_ACTION_HINTS.SYNC_CONFIGURATION) {
                                    transLogs.push(captureError.data)
                                } else {
                                    consolelog(process.cwd(), "unhandled payment error capture", "", false)
                                }
                            }
                        }
                        try {
                            captureStatus = await paymentService.getPaymentStatus({
                                noonpayOrderId: parseInt(order.transLogs[1].noonpayOrderId),
                                storeCode: Constant.DATABASE.STORE_CODE.MAIN_WEB_STORE,
                                paymentStatus: Constant.DATABASE.STATUS.PAYMENT.CAPTURED,
                            })
                            transLogs.push(captureStatus)
                        } catch (statusError) {
                            if (statusError.data) {
                                if (statusError.data.actionHint == Constant.DATABASE.TYPE.PAYMENT_ACTION_HINTS.STATUS_USING_NOONPAY_ID) {
                                    transLogs.push(statusError.data)
                                } else if (statusError.data.actionHint == Constant.DATABASE.TYPE.PAYMENT_ACTION_HINTS.SYNC_CONFIGURATION) {
                                    transLogs.push(statusError.data)
                                } else {
                                    consolelog(process.cwd(), "unhandled payment error capture status", "", false)
                                }
                            }
                        }
                        let dataToUpdateOrder = {
                            status: Constant.DATABASE.STATUS.ORDER.BEING_PREPARED.MONGO,
                            "payment.transactionId": captureStatus.transactions[0].id,
                            "payment.status": captureStatus.transactions[0].type,
                            updatedAt: new Date().getTime()
                        }
                        if (transLogs && transLogs.length > 0)
                            dataToUpdateOrder['$addToSet'] = {
                                transLogs: { $each: transLogs.reverse() }
                            }
                        order = await this.updateOneEntityMdb({ _id: order._id }, dataToUpdateOrder, { new: true })
                        if (captureStatus && order && order._id) {
                            CMS.TransactionCMSE.createTransaction({
                                order_id: order.cmsOrderRef,
                                message: captureStatus.transactions[0].type,
                                type: Constant.DATABASE.STATUS.TRANSACTION.CAPTURE.CMS,
                                payment_data: {
                                    id: captureStatus.transactions[0].id.toString(),
                                    data: JSON.stringify(captureStatus)
                                }
                            })
                            CMS.OrderCMSE.updateOrder({
                                order_id: order.cmsOrderRef,
                                payment_status: Constant.DATABASE.STATUS.PAYMENT.CAPTURED,
                                order_status: Constant.DATABASE.STATUS.ORDER.BEING_PREPARED.CMS,
                                sdm_order_id: order.sdmOrderRef
                            })
                        }
                    }
                }
                // send notification(sms + email) on order confirmaton

                let isDelivery = order.orderType === Constant.DATABASE.TYPE.ORDER.DELIVERY;
                let userData = await userService.fetchUser({ userId: order.userId });
                notificationService.sendNotification({
                    toSendMsg: true,
                    toSendEmail: true,
                    msgCode: isDelivery ? Constant.NOTIFICATION_CODE.SMS.ORDER_DELIVERY_CONFIRM
                        : Constant.NOTIFICATION_CODE.SMS.ORDER_PICKUP_CONFIRM,
                    emailCode: isDelivery ? Constant.NOTIFICATION_CODE.EMAIL.ORDER_DELIVERY_CONFIRM
                        : Constant.NOTIFICATION_CODE.EMAIL.ORDER_PICKUP_CONFIRM,
                    msgDestination: `${userData.cCode}${userData.phnNo}`,
                    emailDestination: userData.email,
                    language: order.language,
                    payload: JSON.stringify({ msg: order, email: { order } })
                });
            }
            return { recheck, order }
        } catch (error) {
            consolelog(process.cwd(), "sdmConfirmedHandler", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async sdmReadyHandler(recheck: boolean, oldSdmStatus: number, order: IOrderRequest.IOrderData, sdmOrder) {
        try {
            console.log(` READY : current sdm status : ${sdmOrder.Status}, old sdm status : ${oldSdmStatus}`)
            if ((oldSdmStatus < parseInt(sdmOrder.Status)) && (oldSdmStatus != parseInt(sdmOrder.Status))) {
                consolelog(process.cwd(), "READY 1 :       ", parseInt(sdmOrder.Status), true)
                order = await this.updateOneEntityMdb({ _id: order._id }, {
                    status: Constant.DATABASE.STATUS.ORDER.READY.MONGO,
                    updatedAt: new Date().getTime(),
                }, { new: true })
                CMS.OrderCMSE.updateOrder({
                    order_id: order.cmsOrderRef,
                    payment_status: Constant.DATABASE.STATUS.PAYMENT.CAPTURED,
                    order_status: Constant.DATABASE.STATUS.ORDER.READY.CMS,
                    sdm_order_id: order.sdmOrderRef
                })
                if (order.orderType == Constant.DATABASE.TYPE.ORDER.PICKUP)
                    recheck = false
            }
            return { recheck, order }
        } catch (error) {
            consolelog(process.cwd(), "sdmReadyHandler", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async sdmOnTheWayHandler(recheck: boolean, oldSdmStatus: number, order: IOrderRequest.IOrderData, sdmOrder) {
        try {
            console.log(` ON_THE_WAY : current sdm status : ${sdmOrder.Status}, old sdm status : ${oldSdmStatus}`)
            if ((oldSdmStatus < parseInt(sdmOrder.Status)) && (oldSdmStatus != parseInt(sdmOrder.Status))) {
                consolelog(process.cwd(), "ON_THE_WAY 1 :       ", parseInt(sdmOrder.Status), true)
                if (parseInt(sdmOrder.Status) == 32) {
                    order = await this.updateOneEntityMdb({ _id: order._id }, {
                        status: Constant.DATABASE.STATUS.ORDER.ON_THE_WAY.MONGO,
                        updatedAt: new Date().getTime(),
                    }, { new: true })
                    CMS.OrderCMSE.updateOrder({
                        order_id: order.cmsOrderRef,
                        payment_status: Constant.DATABASE.STATUS.PAYMENT.CAPTURED,
                        order_status: Constant.DATABASE.STATUS.ORDER.ON_THE_WAY.CMS,
                        sdm_order_id: order.sdmOrderRef
                    })
                }
            }
            return { recheck, order }
        } catch (error) {
            consolelog(process.cwd(), "sdmOnTheWayHandler", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async sdmDeliveredHandler(recheck: boolean, oldSdmStatus: number, order: IOrderRequest.IOrderData, sdmOrder) {
        try {
            console.log(` DELIVERED : current sdm status : ${sdmOrder.Status}, old sdm status : ${oldSdmStatus}`)
            if ((oldSdmStatus < parseInt(sdmOrder.Status)) && (oldSdmStatus != parseInt(sdmOrder.Status))) {
                consolelog(process.cwd(), "DELIVERED 1 :       ", parseInt(sdmOrder.Status), true)
                recheck = false
                order = await this.updateOneEntityMdb({ _id: order._id }, {
                    isActive: 0,
                    status: Constant.DATABASE.STATUS.ORDER.DELIVERED.MONGO,
                    updatedAt: new Date().getTime(),
                    trackUntil: new Date().getTime() + Constant.SERVER.TRACK_ORDER_UNITIL,
                }, { new: true })
                CMS.OrderCMSE.updateOrder({
                    order_id: order.cmsOrderRef,
                    payment_status: Constant.DATABASE.STATUS.PAYMENT.CAPTURED,
                    order_status: Constant.DATABASE.STATUS.ORDER.DELIVERED.CMS,
                    sdm_order_id: order.sdmOrderRef
                })
            }
            return { recheck, order }
        } catch (error) {
            consolelog(process.cwd(), "sdmDeliveredHandler", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async sdmCancelledHandler(recheck: boolean, oldSdmStatus: number, order: IOrderRequest.IOrderData, sdmOrder) {
        try {
            console.log(` CANCELED : current sdm status : ${sdmOrder.Status}, old sdm status : ${oldSdmStatus}`)
            if ((oldSdmStatus < parseInt(sdmOrder.Status)) && (oldSdmStatus != parseInt(sdmOrder.Status))) {
                consolelog(process.cwd(), "CANCELED 1 :       ", parseInt(sdmOrder.Status), true)
                recheck = false
                order = await this.updateOneEntityMdb({ _id: order._id }, {
                    isActive: 0,
                    status: Constant.DATABASE.STATUS.ORDER.CANCELED.MONGO,
                    updatedAt: new Date().getTime(),
                }, { new: true })
                CMS.OrderCMSE.updateOrder({
                    order_id: order.cmsOrderRef,
                    payment_status: Constant.DATABASE.STATUS.PAYMENT.FAILED,
                    order_status: Constant.DATABASE.STATUS.ORDER.CANCELED.CMS,
                    sdm_order_id: order.sdmOrderRef
                });

                // send notification(sms + email) on order cancellation
                let userData = await userService.fetchUser({ userId: order.userId });
                notificationService.sendNotification({
                    toSendMsg: true,
                    toSendEmail: true,
                    msgCode: Constant.NOTIFICATION_CODE.SMS.ORDER_CANCEL,
                    emailCode: Constant.NOTIFICATION_CODE.EMAIL.ORDER_CANCEL,
                    msgDestination: `${userData.cCode}${userData.phnNo}`,
                    emailDestination: userData.email,
                    language: order.language,
                    payload: JSON.stringify({ msg: order, email: { order } })
                });
            }
            return { recheck, order }
        } catch (error) {
            consolelog(process.cwd(), "sdmCancelledHandler", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
    * @method AGGREGATE
    * @param {number} page : page number
    * */
    async getOrderHistory(payload: IOrderRequest.IOrderHistory, auth: ICommonRequest.AuthorizationObj) {
        try {
            let nextPage
            let limit = 21
            let skip = (limit * (payload.page - 1));
            let pipeline = [];

            let match = { userId: auth.id }
            if (payload.isActive == 1) {
                match['$or'] = [
                    {
                        status: Constant.DATABASE.STATUS.ORDER.DELIVERED.MONGO,
                        trackUntil: { $gte: new Date().getTime() }
                    },
                    {
                        status: {
                            $in: [
                                Constant.DATABASE.STATUS.ORDER.PENDING.MONGO,
                                Constant.DATABASE.STATUS.ORDER.CONFIRMED.MONGO,
                                Constant.DATABASE.STATUS.ORDER.BEING_PREPARED.MONGO,
                                Constant.DATABASE.STATUS.ORDER.READY.MONGO,
                                Constant.DATABASE.STATUS.ORDER.ON_THE_WAY.MONGO
                            ]
                        },
                        isActive: 1
                    }
                ]
            }

            pipeline.push({
                $match: match
            })
            if (payload.isActive == 1) {
                pipeline.push({ $sort: { createdAt: -1 } })
            } else {
                pipeline.push({ $sort: { isActive: -1, createdAt: -1 } })
            }
            pipeline = pipeline.concat([
                { $skip: skip },
                { $limit: limit },
                {
                    $project: {
                        transLogs: 0,
                    }
                }
            ])
            let getOrderHistory: IOrderRequest.IOrderData[] = await this.aggregateMdb(pipeline, { lean: true })
            nextPage = (getOrderHistory.length == limit) ? (payload.page + 1) : -1
            return {
                list: getOrderHistory,
                nextPage: nextPage,
                currentPage: parseInt(payload.page.toString())
            }
        } catch (error) {
            consolelog(process.cwd(), "getOrderHistory", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const OrderE = new OrderClass()
