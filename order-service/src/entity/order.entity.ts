'use strict';
import * as Constant from '../constant'
import { BaseEntity } from './base.entity'
import { consolelog } from '../utils'
import * as CMS from "../cms"
import { kafkaService, paymentService } from '../grpc/client';
import { OrderSDME } from '../sdm';


export class OrderClass extends BaseEntity {
    constructor() {
        super('order')
    }
    /**
    * @method INTERNAL
    * @description Sync order request in KAFKA for creating order on SDM
    */
    async syncOrder(payload: ICartRequest.ICartData) {
        try {
            let sdmOrderChange = {
                set: this.set,
                sdm: {
                    create: true,
                    argv: JSON.stringify(payload)
                }
            }
            kafkaService.kafkaSync(sdmOrderChange)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncOrder", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async createOrderOnCMS(payload: IOrderCMSRequest.ICreateOrderCms, cmsAddressRef: number) {
        try {
            payload['address_id'] = 7// cmsAddressRef
            let cmsOrder = await CMS.OrderCMSE.createOrder(payload)
            return cmsOrder
        } catch (error) {
            consolelog(process.cwd(), "createOrderOnCMS", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    createCEntries(items) {
        try {
            // let Entries = {
            //     "CEntry": [
            //         {
            //             "ItemID": "110002",
            //             "Level": "0",
            //             "ModCode": "NONE",
            //             "Name": "Kids Chicken Meal",
            //             "OrdrMode": "OM_SAVED",
            //             "Price": "13",
            //             "Status": "NOTAPPLIED"
            //         },
            //         {
            //             "ItemID": "110002",
            //             "Level": "0",
            //             "ModCode": "NONE",
            //             "Name": "Kids Chicken Meal",
            //             "OrdrMode": "OM_SAVED",
            //             "Price": "13",
            //             "Status": "NOTAPPLIED"
            //         },
            //         {
            //             "ItemID": "110002",
            //             "Level": "0",
            //             "ModCode": "NONE",
            //             "Name": "Kids Chicken Meal",
            //             "OrdrMode": "OM_SAVED",
            //             "Price": "13",
            //             "Status": "NOTAPPLIED"
            //         }
            //     ]
            // }

            let Entries = {
                CEntry: []
            }
            items.forEach(product => {
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
                                    ItemID: 600002,// i.sdmId,
                                    Level: 0,
                                    ModCode: "NONE",
                                    Name: i.name,
                                    OrdrMode: "OM_SAVED",
                                    Price: i.specialPrice,
                                    Status: "NOTAPPLIED",



                                    // DealID: 0,
                                    // ID: 0,
                                    // ItemID: i.sdmId,
                                    // ModCode: "NONE",
                                    // Name: i.name,
                                    // QCComponent: -1,
                                    // QCInstanceID: instanceId,
                                    // QCLevel: 0,
                                    // QCProID: product.promoId,
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
                                                    QCComponent: pl.compId,
                                                    QCInstanceID: instanceId,
                                                    QCLevel: 0,
                                                    QCProID: product.promoId,
                                                }
                                                product.bundleProductOptions.forEach(plbpo => {
                                                    if (plbpo.position == pl.dependentSteps[0]) {
                                                        if (plbpo.type == "stepper") {
                                                            plbpo.productLinks.forEach(plbpopl => {
                                                                for (let i = 0; i < plbpopl.selectionQty; i++) {
                                                                    obj.Entries.CEntry.push({
                                                                        DealID: 0,
                                                                        ID: 0,
                                                                        ItemID: plbpopl.sdmId,
                                                                        ModCode: "NONE",
                                                                        Name: plbpopl.name,
                                                                        QCComponent: plbpopl.compId,
                                                                        QCInstanceID: instanceId,
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
                                                        QCComponent: 0,
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
                                                                console.log("dependentSteps", dependentSteps)

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
                                                                    if (bpoplso.selected == 1)
                                                                        ItemID = bpoplso.sdmId
                                                                })
                                                            }
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
                                                console.log("dependentSteps", dependentSteps)
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
    async createSdmOrder(payload: ICartRequest.ICartData) {
        try {
            let total
            payload.amount.filter(elem => {
                if (elem.code == "TOTAL") {
                    return total = elem
                }
            })
            let subtotal
            payload.amount.filter(elem => {
                if (elem.code == "SUB_TOTAL") {
                    return subtotal = elem
                }
            })
            let order = {
                AddressID: 10512054,// 10084693,// payload.address.sdmAddressRef,
                CityID: 17, //not mandatory
                AreaID: 16,// 538,// payload.address.sdmAddressRef,
                BackupStoreID: -1,
                ConceptID: 3,// payload.address.sdmAddressRef,
                CustomerID: 7694143,// 7323013,//payload.address.sdmAddressRef,
                Entries: this.createCEntries(payload.items),
                OrderMode: (payload['orderType'] == Constant.DATABASE.TYPE.ORDER.DELIVERY) ? 1 : 2,
                OrderType: 0,
                OriginalStoreID: 1219,// 65,// payload.store.sdmStoreRef,
                PaidOnline: (payload['paymentMethodId'] == 0) ? 0 : 1,
                PaymentMethod: (payload['paymentMethodId'] == 0) ? "Cash" : "Credit",
                ServiceCharge: 6.5,
                Source: 2, //or 22 configurable
                Status: 0,
                StoreID: 1219,// 65,// payload.store.sdmStoreRef,
                SubTotal: "2.75",// subtotal.amount,
                Total: "3.0",// total.amount,
                ValidateStore: 0,
            }

            /**
             * @step 1 :create order on sdm 
             * @step 2 :update mongo order using payload.cartId sdmOrderRef
             */
            let data: IOrderSdmRequest.ICreateOrder = {
                licenseCode: "AmericanaWeb",
                conceptID: 3,
                order: order,
                autoApprove: true,
                useBackupStoreIfAvailable: true,
                orderNotes1: "Test order notes 1",
                orderNotes2: "Test order notes 2",
                creditCardPaymentbool: (payload['paymentMethodId'] == 0) ? 0 : 1,
                isSuspended: (payload['paymentMethodId'] == 0) ? 0 : 1,
                menuTemplateID: 17,
            }
            let createOrder = await OrderSDME.createOrder(data)
            if (createOrder) {
                let order = await this.updateOneEntityMdb({ cartId: payload.cartId }, {
                    sdmOrderRef: createOrder,
                    isActive: 1,
                    updatedAt: new Date().getTime()
                }, { new: true })
                if (order && order._id) {
                    this.getSdmOrder({
                        sdmOrderRef: order.sdmOrderRef,
                        timeInterval: Constant.KAFKA.SDM.ORDER.INTERVAL.GET_STATUS,
                        status: Constant.DATABASE.STATUS.ORDER.PENDING.MONGO
                    })
                }
                return {}
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E500.CREATE_ORDER_ERROR)
        } catch (error) {
            consolelog(process.cwd(), "createSdmOrder", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
    * @method INTERNAL
    * */
    async createOrder(orderType: string, cartData: ICartRequest.ICartData, address: IUserGrpcRequest.IFetchAddressRes, store: IStoreGrpcRequest.IStore) {
        try {
            let orderData = {
                orderType: orderType,
                cartId: cartData.cartId,
                cmsCartRef: cartData.cmsCartRef,
                sdmOrderRef: 0,
                cmsOrderRef: cartData.cmsOrderRef,
                userId: cartData.userId,
                orderId: cartData.orderId,
                status: Constant.DATABASE.STATUS.ORDER.PENDING.MONGO,
                sdmOrderStatus: -1,
                items: cartData.items,
                amount: cartData.amount,
                address: {
                    addressId: address.id,
                    sdmStoreRef: address.sdmStoreRef,
                    sdmAddressRef: address.sdmAddressRef,
                    cmsAddressRef: address.cmsAddressRef,
                    tag: address.tag,
                    bldgName: address.bldgName,
                    description: address.description,
                    flatNum: address.flatNum,
                    addressType: address.addressType,
                    lat: address.lat,
                    lng: address.lng
                },
                store: {
                    sdmStoreRef: store.storeId,
                    areaId: store.areaId,
                    location: store.location,
                    address_en: store.address_en,
                    address_ar: store.address_ar,
                    name_en: store.name_en,
                    name_ar: store.name_ar
                },
                payment: {},
                transLogs: [],
                createdAt: new Date().getTime(),
                updatedAt: 0,
                trackUntil: 0,
                isActive: 1,
                changePaymentMode: 0,
                paymentMethodAddedOnSdm: 0,
            }
            let order: IOrderRequest.IOrderData = await this.createOneEntityMdb(orderData)
            return order
        } catch (error) {
            consolelog(process.cwd(), "createOrder", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
    * @method GRPC
    * @param {string} status : mongo order status
    * @param {string} sdmOrderRef : sdm order id
    * @param {string} timeInterval : set timeout interval
    * */
    async getSdmOrder(payload: IOrderRequest.IGetSdmOrder) {
        try {
            let recheck = true
            setTimeout(async () => {
                let order = await this.getOneEntityMdb({ sdmOrderRef: payload.sdmOrderRef }, { items: 0, amount: 0 })
                if (order && order._id) {
                    if (order.sdmOrderRef && order.sdmOrderRef != 0) {
                        let sdmOrder = await OrderSDME.getOrderDetail({ sdmOrderRef: order.sdmOrderRef })
                        /**
                         * @step 1 : update mongo order status wrt to sdmOrder status
                         */
                        if (sdmOrder && sdmOrder.OrderID && (parseInt(sdmOrder.Status) > order.sdmOrderStatus)) {
                            if (Constant.DATABASE.STATUS.ORDER.PENDING.SDM.indexOf(parseInt(sdmOrder.Status)) >= 0) {
                                consolelog(process.cwd(), "STATE : 1", sdmOrder.Status, true)
                                if (sdmOrder.Status == 96 && order.payment && order.payment.status == "AUTHORIZATION" && (order.paymentMethodAddedOnSdm == 0)) {
                                    consolelog(process.cwd(), "STATE : 2", sdmOrder.Status, true)
                                    /**
                                    * @description : add payment object to sdm
                                    */
                                    let paymentObjAdded = await OrderSDME.processCreditCardOnSdm({ sdmOrderRef: order.sdmOrderRef, transaction: order.transLogs[1] })
                                    if (paymentObjAdded) {
                                        consolelog(process.cwd(), "STATE : 3", sdmOrder.Status, true)
                                        order = await this.updateOneEntityMdb({ _id: order._id }, {
                                            paymentMethodAddedOnSdm: 1,
                                            updatedAt: new Date().getTime(),
                                            sdmOrderStatus: sdmOrder.Status
                                        }, { new: true })
                                    }
                                    else {
                                        consolelog(process.cwd(), "STATE : 4", sdmOrder.Status, true)
                                        /**
                                        * @description : in case of failure while adding payment object
                                        */
                                        recheck = false
                                        order = await this.updateOneEntityMdb({ _id: order._id }, {
                                            status: Constant.DATABASE.STATUS.ORDER.FAILURE.MONGO,
                                            changePaymentMode: true,
                                            updatedAt: new Date().getTime(),
                                            sdmOrderStatus: sdmOrder.Status
                                        }, { new: true })
                                    }
                                }
                            }
                            else if (Constant.DATABASE.STATUS.ORDER.CONFIRMED.SDM.indexOf(parseInt(sdmOrder.Status)) >= 0) {
                                consolelog(process.cwd(), "STATE : 5", sdmOrder.Status, true)
                                if (order.payment.status == "AUTHORIZATION") {
                                    consolelog(process.cwd(), "STATE : 6", sdmOrder.Status, true)
                                    order = await this.updateOneEntityMdb({ _id: order._id }, {
                                        status: Constant.DATABASE.STATUS.ORDER.CONFIRMED.MONGO,
                                        updatedAt: new Date().getTime(),
                                        sdmOrderStatus: sdmOrder.Status
                                    }, { new: true })
                                    await paymentService.capturePayment({
                                        noonpayOrderId: order.transLogs[1].noonpayOrderId,
                                        orderId: order.transLogs[1].orderId,
                                        amount: order.transLogs[1].amount,
                                        storeCode: "kfc_uae_store"
                                    })
                                    let status = await paymentService.getPaymentStatus({
                                        noonpayOrderId: order.transLogs[1].noonpayOrderId,
                                        storeCode: "kfc_uae_store",
                                        paymentStatus: "CAPTURED",
                                    })
                                    this.updateOneEntityMdb({ _id: order._id }, {
                                        status: Constant.DATABASE.STATUS.ORDER.BEING_PREPARED.MONGO,
                                        "payment.transactionId": status.transactions[0].id,
                                        "payment.status": status.transactions[0].type,
                                        $addToSet: {
                                            transLogs: status
                                        },
                                        updatedAt: new Date().getTime()
                                    })
                                }
                            }
                            else if (Constant.DATABASE.STATUS.ORDER.READY.SDM.indexOf(parseInt(sdmOrder.Status)) >= 0) {
                                consolelog(process.cwd(), "STATE : 7", sdmOrder.Status, true)
                                this.updateOneEntityMdb({ _id: order._id }, {
                                    status: Constant.DATABASE.STATUS.ORDER.READY.MONGO,
                                    updatedAt: new Date().getTime(),
                                    sdmOrderStatus: sdmOrder.Status
                                })
                            }
                            else if (Constant.DATABASE.STATUS.ORDER.ON_THE_WAY.SDM.indexOf(parseInt(sdmOrder.Status)) >= 0) {
                                consolelog(process.cwd(), "STATE : 8", sdmOrder.Status, true)
                                this.updateOneEntityMdb({ _id: order._id }, {
                                    status: Constant.DATABASE.STATUS.ORDER.ON_THE_WAY.MONGO,
                                    updatedAt: new Date().getTime(),
                                    sdmOrderStatus: sdmOrder.Status
                                })
                            }
                            else if (Constant.DATABASE.STATUS.ORDER.DELIVERED.SDM.indexOf(parseInt(sdmOrder.Status)) >= 0) {
                                consolelog(process.cwd(), "STATE : 9", sdmOrder.Status, true)
                                recheck = false
                                this.updateOneEntityMdb({ _id: order._id }, {
                                    isActive: 0,
                                    status: Constant.DATABASE.STATUS.ORDER.DELIVERED.MONGO,
                                    updatedAt: new Date().getTime(),
                                    trackUntil: new Date().getTime() + Constant.SERVER.TRACK_ORDER_UNITIL,
                                    sdmOrderStatus: sdmOrder.Status
                                })
                            }
                            else if (Constant.DATABASE.STATUS.ORDER.CLOSED.SDM.indexOf(parseInt(sdmOrder.Status)) >= 0) {
                                consolelog(process.cwd(), "STATE : 10", sdmOrder.Status, true)
                                recheck = false
                                this.updateOneEntityMdb({ _id: order._id }, {
                                    isActive: 0,
                                    status: Constant.DATABASE.STATUS.ORDER.CLOSED.MONGO,
                                    updatedAt: new Date().getTime(),
                                    sdmOrderStatus: sdmOrder.Status
                                })
                            }
                            else if (Constant.DATABASE.STATUS.ORDER.CANCELED.SDM.indexOf(parseInt(sdmOrder.Status)) >= 0) {
                                consolelog(process.cwd(), "STATE : 11", sdmOrder.Status, true)
                                recheck = false
                                this.updateOneEntityMdb({ _id: order._id }, {
                                    isActive: 0,
                                    status: Constant.DATABASE.STATUS.ORDER.CANCELED.MONGO,
                                    updatedAt: new Date().getTime(),
                                    sdmOrderStatus: sdmOrder.Status
                                })
                            }
                            else if (Constant.DATABASE.STATUS.ORDER.FAILURE.SDM.indexOf(parseInt(sdmOrder.Status)) >= 0) {
                                consolelog(process.cwd(), "STATE : 12", sdmOrder.Status, true)
                                recheck = false
                                this.updateOneEntityMdb({ _id: order._id }, {
                                    isActive: 0,
                                    status: Constant.DATABASE.STATUS.ORDER.FAILURE.MONGO,
                                    updatedAt: new Date().getTime(),
                                    sdmOrderStatus: sdmOrder.Status
                                })
                            }
                            else {
                                recheck = false
                                consolelog(process.cwd(), `UNHANDLED SDM ORDER STATUS for orderId : ${parseInt(sdmOrder.Status)} : `, parseInt(sdmOrder.Status), true)
                            }
                        }
                        if (recheck) {
                            let orderChange = {
                                set: this.set,
                                sdm: {
                                    get: true,
                                    argv: JSON.stringify(payload)
                                },
                                count: -1
                            }
                            kafkaService.kafkaSync(orderChange)
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
                pipeline.push({ $sort: { updatedAt: -1 } })
            } else {
                pipeline.push({ $sort: { isActive: -1, updatedAt: -1 } })
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
