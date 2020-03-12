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
                                                                                let ItemID = 0
                                                                                if (dspl.subOptions && dspl.subOptions.length > 0) {
                                                                                    dspl.subOptions.forEach(dsplso => {
                                                                                        if (dsplso.selected == 1)
                                                                                            ItemID = dsplso.sdmId
                                                                                    })
                                                                                }
                                                                                if (ItemID)
                                                                                    obj.Entries.CEntry.push({
                                                                                        ID: 0,
                                                                                        ItemID: ItemID,
                                                                                        ModCode: "WITH",
                                                                                        ModgroupID: dspl.modGroupId,
                                                                                        Name: dspl.name,
                                                                                        OrdrMode: "OM_SAVED",
                                                                                        Weight: 0
                                                                                    })
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
                                                                let ItemID = 0
                                                                if (bpopl.subOptions && bpopl.subOptions.length > 0) {
                                                                    bpopl.subOptions.forEach(bpoplso => {
                                                                        console.log("mongo", bpoplso)
                                                                        if (bpoplso.selected == 1)
                                                                            ItemID = bpoplso.sdmId
                                                                    })
                                                                }
                                                                if (ItemID)
                                                                    lastProductAddedInCentry.Entries.CEntry.push({
                                                                        ID: 0,
                                                                        ItemID: ItemID,
                                                                        ModCode: "WITH",
                                                                        ModgroupID: bpopl.modGroupId,
                                                                        Name: bpopl.name,
                                                                        OrdrMode: "OM_SAVED",
                                                                        Weight: 0
                                                                    })
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
                let discountAmount = payload.amount.filter(obj => { return obj.type == Constant.DATABASE.TYPE.CART_AMOUNT.DISCOUNT })
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
                orderNotes1: payload.cmsOrderRef,
                orderNotes2: payload._id,
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
                this.updateOneEntityMdb({ cartUnique: payload.cartUnique }, {
                    isActive: 0,
                    status: Constant.DATABASE.STATUS.ORDER.FAILURE.MONGO,
                    updatedAt: new Date().getTime(),
                    sdmOrderStatus: -2,
                    validationRemarks: createOrder.ResultText
                })
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
        userData: IUserRequest.IUserData,
        promo: IPromotionGrpcRequest.IValidatePromotionRes) {
        try {
            console.log("cartDaTa", cartData)
            let amount = cartData.amount
            if (cartData.orderType == Constant.DATABASE.TYPE.ORDER.PICKUP) {
                amount = amount.filter(obj => { return obj.type != Constant.DATABASE.TYPE.CART_AMOUNT.SHIPPING })
            }
            let items = cartData.items
            if (headers.language == Constant.DATABASE.LANGUAGE.EN)
                items = items.concat(cartData.selFreeItem.en)
            else
                items = items.concat(cartData.selFreeItem.ar)
            let orderData = {
                orderType: cartData.orderType,
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
                paymentMethodAddedOnSdm: 0
            }
            if (promo) {
                orderData['promo'] = promo
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
                let oldStatus = order.sdmOrderStatus
                if (order && order._id) {
                    consolelog(process.cwd(), "order step 0:       ", order.sdmOrderStatus, true)
                    if ((order.createdAt + (30 * 60 * 60 * 1000)) < new Date().getTime()) {
                        consolelog(process.cwd(), "order step 1:       ", order.sdmOrderStatus, true)
                        recheck = false
                    }
                    if (recheck) {
                        consolelog(process.cwd(), "order step 2:       ", order.sdmOrderStatus, true)
                        if (order.sdmOrderRef && order.sdmOrderRef != 0) {
                            consolelog(process.cwd(), "order step 3:       ", order.sdmOrderStatus, true)
                            let sdmOrder = await OrderSDME.getOrderDetail({ sdmOrderRef: order.sdmOrderRef })
                            console.log(process.cwd(), "SDM order status", typeof sdmOrder.Status, parseInt(sdmOrder.Status), true)
                            if (sdmOrder.Status && typeof sdmOrder.Status) {
                                if (order.sdmOrderStatus != parseInt(sdmOrder.Status)) {
                                    order = await this.updateOneEntityMdb({ _id: order._id }, {
                                        updatedAt: new Date().getTime(),
                                        sdmOrderStatus: parseInt(sdmOrder.Status)
                                    }, { new: true })
                                    if (recheck && sdmOrder.Total) {
                                        consolelog(process.cwd(), "order step 4:       ", sdmOrder.ValidationRemarks, true)
                                        let amount = order.amount.filter(obj => { return obj.type == Constant.DATABASE.TYPE.CART_AMOUNT.TOTAL })
                                        console.log("amount validation", amount[0].amount, sdmOrder.Total, typeof sdmOrder.Total)
                                        // if (amount[0].amount != parseFloat(sdmOrder.Total)) {
                                        //     consolelog(process.cwd(), "order step 5:       ", sdmOrder.ValidationRemarks, true)
                                        //     recheck = false
                                        //     if (order.payment.paymentMethodId == Constant.DATABASE.TYPE.PAYMENT_METHOD_ID.COD) {
                                        //         consolelog(process.cwd(), "order step 6:       ", sdmOrder.ValidationRemarks, true)
                                        //         order = await this.updateOneEntityMdb({ _id: order._id }, {
                                        //             isActive: 0,
                                        //             status: Constant.DATABASE.STATUS.ORDER.FAILURE.MONGO,
                                        //             updatedAt: new Date().getTime(),
                                        //             validationRemarks: Constant.STATUS_MSG.SDM_ORDER_VALIDATION.ORDER_AMOUNT_MISMATCH,
                                        //         }, { new: true })
                                        //         CMS.OrderCMSE.updateOrder({
                                        //             order_id: order.cmsOrderRef,
                                        //             payment_status: Constant.DATABASE.STATUS.TRANSACTION.VOID_AUTHORIZATION.AS,
                                        //             order_status: Constant.DATABASE.STATUS.ORDER.FAILURE.CMS
                                        //         })
                                        //     } else {
                                        //         consolelog(process.cwd(), "order step 7:       ", sdmOrder.ValidationRemarks, true)
                                        //         await paymentService.reversePayment({
                                        //             noonpayOrderId: order.transLogs[1].noonpayOrderId,
                                        //             storeCode: Constant.DATABASE.STORE_CODE.MAIN_WEB_STORE
                                        //         })
                                        //         let status = await paymentService.getPaymentStatus({
                                        //             noonpayOrderId: order.transLogs[1].noonpayOrderId,
                                        //             storeCode: Constant.DATABASE.STORE_CODE.MAIN_WEB_STORE,
                                        //             paymentStatus: Constant.DATABASE.STATUS.PAYMENT.CANCELLED,
                                        //         })
                                        //         order = await this.updateOneEntityMdb({ _id: order._id }, {
                                        //             isActive: 0,
                                        //             status: Constant.DATABASE.STATUS.ORDER.FAILURE.MONGO,
                                        //             updatedAt: new Date().getTime(),
                                        //             validationRemarks: Constant.STATUS_MSG.SDM_ORDER_VALIDATION.ORDER_AMOUNT_MISMATCH,
                                        //             $addToSet: {
                                        //                 transLogs: status
                                        //             },
                                        //             "payment.status": Constant.DATABASE.STATUS.TRANSACTION.VOID_AUTHORIZATION.AS
                                        //         }, { new: true })
                                        //         CMS.TransactionCMSE.createTransaction({
                                        //             order_id: order.cmsOrderRef,
                                        //             message: status.transactions[0].type,
                                        //             type: Constant.DATABASE.STATUS.TRANSACTION.VOID_AUTHORIZATION.CMS,
                                        //             payment_data: {
                                        //                 id: status.transactions[0].id.toString(),
                                        //                 data: JSON.stringify(status)
                                        //             }
                                        //         })
                                        //         CMS.OrderCMSE.updateOrder({
                                        //             order_id: order.cmsOrderRef,
                                        //             payment_status: Constant.DATABASE.STATUS.TRANSACTION.VOID_AUTHORIZATION.AS,
                                        //             order_status: Constant.DATABASE.STATUS.ORDER.FAILURE.CMS
                                        //         })
                                        //     }
                                        // }
                                    }
                                    if (recheck && sdmOrder.ValidationRemarks &&
                                        (sdmOrder.ValidationRemarks != null || sdmOrder.ValidationRemarks != "null") &&
                                        sdmOrder.ValidationRemarks != Constant.STATUS_MSG.SDM_ORDER_VALIDATION.EXCEED_ORDER_AMOUNT
                                    ) {
                                        consolelog(process.cwd(), "order step 8:       ", sdmOrder.ValidationRemarks, true)
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
                                            order_status: Constant.DATABASE.STATUS.ORDER.FAILURE.CMS
                                        })
                                    }
                                    if (recheck && sdmOrder && sdmOrder.OrderID) {
                                        consolelog(process.cwd(), "order step 9:       ", order.sdmOrderStatus, true)
                                        consolelog(process.cwd(), "order step 10:       ", oldStatus, true)
                                        if (
                                            (parseInt(sdmOrder.Status) >= oldStatus) ||
                                            ((parseInt(sdmOrder.Status) == 0 || parseInt(sdmOrder.Status) == 96) && parseInt(sdmOrder.Status) < oldStatus)
                                        ) {
                                            consolelog(process.cwd(), "order step 11:       ", parseInt(sdmOrder.Status), true)
                                            switch (parseInt(sdmOrder.Status)) {
                                                case 0:
                                                case 96:
                                                case 1: {
                                                    consolelog(process.cwd(), "order step 12 :       ", parseInt(sdmOrder.Status), true)
                                                    if (order.payment.paymentMethodId == Constant.DATABASE.TYPE.PAYMENT_METHOD_ID.COD) {
                                                        consolelog(process.cwd(), "order step 13 :       ", parseInt(sdmOrder.Status), true)
                                                    } else {
                                                        consolelog(process.cwd(), "order step 14 :       ", parseInt(sdmOrder.Status), true)
                                                        if (parseInt(sdmOrder.Status) == 96) {
                                                            consolelog(process.cwd(), "order step 15 :       ", parseInt(sdmOrder.Status), true)
                                                            if (order.payment && order.payment.status == Constant.DATABASE.STATUS.TRANSACTION.AUTHORIZATION.AS) {
                                                                consolelog(process.cwd(), "order step 16 :       ", parseInt(sdmOrder.Status), true)
                                                                if (order.paymentMethodAddedOnSdm == 0) {
                                                                    consolelog(process.cwd(), "order step 17 :       ", parseInt(sdmOrder.Status), true)
                                                                    /**
                                                                    * @description : add payment object to sdm
                                                                    */
                                                                    let paymentObjAdded = await OrderSDME.processCreditCardOnSdm({ sdmOrderRef: order.sdmOrderRef, transaction: order.transLogs[1] })
                                                                    if (paymentObjAdded) {
                                                                        consolelog(process.cwd(), "order step 18 :       ", parseInt(sdmOrder.Status), true)
                                                                        order = await this.updateOneEntityMdb({ _id: order._id }, {
                                                                            paymentMethodAddedOnSdm: 1,
                                                                            updatedAt: new Date().getTime(),
                                                                        }, { new: true })
                                                                    }
                                                                    else {
                                                                        consolelog(process.cwd(), "order step 19 :       ", parseInt(sdmOrder.Status), true)
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
                                                                            order_status: Constant.DATABASE.STATUS.ORDER.FAILURE.CMS
                                                                        })
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        else if (parseInt(sdmOrder.Status) == 0) {
                                                            consolelog(process.cwd(), "order step 20 :       ", parseInt(sdmOrder.Status), true)
                                                        }
                                                    }
                                                    break;
                                                }
                                                case 2: {
                                                    consolelog(process.cwd(), "order step 21 :       ", parseInt(sdmOrder.Status), true)
                                                    if (order.payment.paymentMethodId == Constant.DATABASE.TYPE.PAYMENT_METHOD_ID.COD) {
                                                        consolelog(process.cwd(), "order step 22 :       ", parseInt(sdmOrder.Status), true)
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
                                                                order_status: Constant.DATABASE.STATUS.ORDER.BEING_PREPARED.CMS
                                                            })
                                                        }, 10000)
                                                    } else {
                                                        consolelog(process.cwd(), "order step 23 :       ", parseInt(sdmOrder.Status), true)
                                                        if (order.payment.status == Constant.DATABASE.STATUS.TRANSACTION.AUTHORIZATION.AS) {
                                                            consolelog(process.cwd(), "order step 24 :       ", parseInt(sdmOrder.Status), true)
                                                            order = await this.updateOneEntityMdb({ _id: order._id }, {
                                                                status: Constant.DATABASE.STATUS.ORDER.CONFIRMED.MONGO,
                                                                updatedAt: new Date().getTime(),
                                                            }, { new: true })
                                                            await paymentService.capturePayment({
                                                                noonpayOrderId: order.transLogs[1].noonpayOrderId,
                                                                orderId: order.transLogs[1].orderId,
                                                                amount: order.transLogs[1].amount,
                                                                storeCode: Constant.DATABASE.STORE_CODE.MAIN_WEB_STORE
                                                            })
                                                            let status = await paymentService.getPaymentStatus({
                                                                noonpayOrderId: order.transLogs[1].noonpayOrderId,
                                                                storeCode: Constant.DATABASE.STORE_CODE.MAIN_WEB_STORE,
                                                                paymentStatus: Constant.DATABASE.STATUS.PAYMENT.CAPTURED,
                                                            })
                                                            order = await this.updateOneEntityMdb({ _id: order._id }, {
                                                                status: Constant.DATABASE.STATUS.ORDER.BEING_PREPARED.MONGO,
                                                                "payment.transactionId": status.transactions[0].id,
                                                                "payment.status": status.transactions[0].type,
                                                                $addToSet: {
                                                                    transLogs: status
                                                                },
                                                                updatedAt: new Date().getTime()
                                                            }, { new: true })
                                                            CMS.TransactionCMSE.createTransaction({
                                                                order_id: order.cmsOrderRef,
                                                                message: status.transactions[0].type,
                                                                type: Constant.DATABASE.STATUS.TRANSACTION.CAPTURE.CMS,
                                                                payment_data: {
                                                                    id: status.transactions[0].id.toString(),
                                                                    data: JSON.stringify(status)
                                                                }
                                                            })
                                                            CMS.OrderCMSE.updateOrder({
                                                                order_id: order.cmsOrderRef,
                                                                payment_status: Constant.DATABASE.STATUS.PAYMENT.CAPTURED,
                                                                order_status: Constant.DATABASE.STATUS.ORDER.BEING_PREPARED.CMS
                                                            })
                                                        }
                                                    }
                                                    break;
                                                }
                                                case 8: {
                                                    consolelog(process.cwd(), "order step 25 :       ", parseInt(sdmOrder.Status), true)
                                                    order = await this.updateOneEntityMdb({ _id: order._id }, {
                                                        status: Constant.DATABASE.STATUS.ORDER.READY.MONGO,
                                                        updatedAt: new Date().getTime(),
                                                    }, { new: true })
                                                    CMS.OrderCMSE.updateOrder({
                                                        order_id: order.cmsOrderRef,
                                                        payment_status: Constant.DATABASE.STATUS.PAYMENT.CAPTURED,
                                                        order_status: Constant.DATABASE.STATUS.ORDER.READY.CMS
                                                    })
                                                    if (order.orderType == Constant.DATABASE.TYPE.ORDER.PICKUP)
                                                        recheck = false
                                                    break;
                                                }
                                                case 16:
                                                case 32: {
                                                    consolelog(process.cwd(), "order step 26 :       ", parseInt(sdmOrder.Status), true)
                                                    if (parseInt(sdmOrder.Status) == 32) {
                                                        order = await this.updateOneEntityMdb({ _id: order._id }, {
                                                            status: Constant.DATABASE.STATUS.ORDER.ON_THE_WAY.MONGO,
                                                            updatedAt: new Date().getTime(),
                                                        }, { new: true })
                                                        CMS.OrderCMSE.updateOrder({
                                                            order_id: order.cmsOrderRef,
                                                            payment_status: Constant.DATABASE.STATUS.PAYMENT.CAPTURED,
                                                            order_status: Constant.DATABASE.STATUS.ORDER.ON_THE_WAY.CMS
                                                        })
                                                    }
                                                    break;
                                                }
                                                case 64:
                                                case 128:
                                                case 2048: {
                                                    consolelog(process.cwd(), "order step 27 :       ", parseInt(sdmOrder.Status), true)
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
                                                        order_status: Constant.DATABASE.STATUS.ORDER.DELIVERED.CMS
                                                    })
                                                    break;
                                                }
                                                case 256:
                                                case 512:
                                                case 1024:
                                                case 4096:
                                                case 8192: {
                                                    consolelog(process.cwd(), "order step 28:       ", parseInt(sdmOrder.Status), true)
                                                    recheck = false
                                                    order = await this.updateOneEntityMdb({ _id: order._id }, {
                                                        isActive: 0,
                                                        status: Constant.DATABASE.STATUS.ORDER.CANCELED.MONGO,
                                                        updatedAt: new Date().getTime(),
                                                    }, { new: true })
                                                    CMS.OrderCMSE.updateOrder({
                                                        order_id: order.cmsOrderRef,
                                                        payment_status: Constant.DATABASE.STATUS.PAYMENT.FAILED,
                                                        order_status: Constant.DATABASE.STATUS.ORDER.CANCELED.CMS
                                                    })
                                                    break;
                                                }
                                                default: {
                                                    recheck = false
                                                    consolelog(process.cwd(), `UNHANDLED SDM ORDER STATUS for orderId : ${parseInt(sdmOrder.Status)} : `, parseInt(sdmOrder.Status), true)
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                    statusChanged = true
                                } else {
                                    if (order.status == Constant.DATABASE.STATUS.ORDER.PENDING.MONGO &&
                                        (order.createdAt + Constant.SERVER.MAX_PENDING_STATE_TIME) < new Date().getTime()) {
                                        recheck = false
                                        order = await this.updateOneEntityMdb({ _id: order._id }, {
                                            isActive: 0,
                                            status: Constant.DATABASE.STATUS.ORDER.FAILURE.MONGO,
                                            updatedAt: new Date().getTime(),
                                            sdmOrderStatus: -2,
                                            validationRemarks: Constant.STATUS_MSG.SDM_ORDER_VALIDATION.MAX_PENDING_TIME_REACHED
                                        })
                                    }
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

                            consolelog(process.cwd(), "final orderstatus   =====>", order.status, true)
                            consolelog(process.cwd(), "final recheck       =====>", recheck, true)
                            consolelog(process.cwd(), "final timeInterval  =====>", payload.timeInterval, true)
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
