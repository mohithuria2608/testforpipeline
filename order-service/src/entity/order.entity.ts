'use strict';
import * as config from "config"
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
                                            let plDefaultSdm = false
                                            if (pl.selected == 1) {
                                                if (pl.subOptions && pl.subOptions.length > 0) {
                                                    pl.subOptions.forEach(dsplso => {
                                                        if (dsplso.is_sdm_default == 1)
                                                            plDefaultSdm = true
                                                    })
                                                    let checkSendNone = false
                                                    pl.subOptions.forEach(so => {
                                                        if (so.selected == 1) {
                                                            checkSendNone = true
                                                            if (so.title == "None") { }
                                                            else if (so.title == "Regular") {
                                                                if (so.sdmId) {
                                                                    if (so.is_sdm_default != undefined) {
                                                                        if (!plDefaultSdm)
                                                                            obj.Entries.CEntry.push({
                                                                                ID: 0,
                                                                                ItemID: so.sdmId,
                                                                                ModCode: "WITH",
                                                                                ModgroupID: pl.modGroupId ? pl.modGroupId : -1,
                                                                                Name: so.name,
                                                                                OrdrMode: "OM_SAVED",
                                                                                Weight: 0,
                                                                            })
                                                                    }
                                                                }
                                                            } else if (so.title == "Extra") {
                                                                if (so.sdmId) {
                                                                    if (so.is_sdm_default != undefined) {
                                                                        if (plDefaultSdm)
                                                                            obj.Entries.CEntry.push({
                                                                                ID: 0,
                                                                                ItemID: so.sdmId,
                                                                                ModCode: "WITH",
                                                                                ModgroupID: pl.modGroupId,
                                                                                Name: so.name,
                                                                                OrdrMode: "OM_SAVED",
                                                                                Weight: 0,
                                                                            })
                                                                        else
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
                                                                    } else {
                                                                        obj.Entries.CEntry.push({
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
                                                            }
                                                        }
                                                    })
                                                    if (plDefaultSdm && !checkSendNone) {
                                                        obj.Entries.CEntry.push({
                                                            ID: 0,
                                                            ItemID: pl.subOptions[0].sdmId,
                                                            ModCode: "NONE",
                                                            ModgroupID: pl.subOptions[0].modGroupId ? pl.subOptions[0].modGroupId : -1,
                                                            Name: pl.name,
                                                            OrdrMode: "OM_SAVED",
                                                            Weight: 0,
                                                        })
                                                    }
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
                                                                    i.bundleProductOptions.forEach(plbpo => {
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
                                                                            } else {
                                                                                /**
                                                                                 * @description (ingredient == 1) :  "name": "Twister Meal"
                                                                                 * @description (isModifier == 1) :  "name": "Mighty Twist"
                                                                                 */
                                                                                if (plbpo.productLinks && plbpo.productLinks.length > 0) {
                                                                                    plbpo.productLinks.forEach(dspl => {
                                                                                        console.log("product name", dspl)

                                                                                        let plDefaultSdm = false
                                                                                        if (dspl.subOptions && dspl.subOptions.length > 0) {
                                                                                            dspl.subOptions.forEach(dsplso => {
                                                                                                if (dsplso.is_sdm_default == 1)
                                                                                                    plDefaultSdm = true
                                                                                            })
                                                                                            console.log("plDefaultSdm", plDefaultSdm)
                                                                                            let checkSendNone = false
                                                                                            dspl.subOptions.forEach(dsplso => {
                                                                                                if (dsplso.sdmId && dsplso.selected == 1) {
                                                                                                    checkSendNone = true
                                                                                                    console.log("product name", dspl.name)
                                                                                                    if (dsplso.title == "None") {
                                                                                                    }
                                                                                                    else if (dsplso.title == "Regular") {
                                                                                                        if (dsplso.sdmId) {
                                                                                                            if (dsplso.is_sdm_default != undefined) {
                                                                                                                if (!plDefaultSdm)
                                                                                                                    obj.Entries.CEntry.push({
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
                                                                                                    } else if (dsplso.title == "Extra") {
                                                                                                        if (dsplso.sdmId) {
                                                                                                            if (dsplso.is_sdm_default != undefined) {
                                                                                                                if (plDefaultSdm)
                                                                                                                    obj.Entries.CEntry.push({
                                                                                                                        ID: 0,
                                                                                                                        ItemID: dsplso.sdmId,
                                                                                                                        ModCode: "WITH",
                                                                                                                        ModgroupID: dspl.modGroupId ? dspl.modGroupId : -1,
                                                                                                                        Name: dspl.name,
                                                                                                                        OrdrMode: "OM_SAVED",
                                                                                                                        Weight: 0,
                                                                                                                    })
                                                                                                                else
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
                                                                                                            } else {
                                                                                                                obj.Entries.CEntry.push({
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
                                                                                                    }
                                                                                                }
                                                                                            })
                                                                                            if (plDefaultSdm && !checkSendNone) {
                                                                                                obj.Entries.CEntry.push({
                                                                                                    ID: 0,
                                                                                                    ItemID: dspl.subOptions[0].sdmId,
                                                                                                    ModCode: "NONE",
                                                                                                    ModgroupID: dspl.subOptions[0].modGroupId ? dspl.subOptions[0].modGroupId : -1,
                                                                                                    Name: dspl.name,
                                                                                                    OrdrMode: "OM_SAVED",
                                                                                                    Weight: 0,
                                                                                                })
                                                                                            }
                                                                                        }
                                                                                    })
                                                                                }
                                                                            }
                                                                        }
                                                                    })
                                                                    Entries.CEntry.push(obj)
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
                                                                let plDefaultSdm = false
                                                                if (bpopl.subOptions && bpopl.subOptions.length > 0) {
                                                                    bpopl.subOptions.forEach(dsplso => {
                                                                        if (dsplso.is_sdm_default == 1)
                                                                            plDefaultSdm = true
                                                                    })
                                                                    let checkSendNone = false
                                                                    bpopl.subOptions.forEach(bpoplso => {
                                                                        if (bpoplso.sdmId && bpoplso.selected == 1) {
                                                                            checkSendNone = true
                                                                            if (bpoplso.title == "None") { }
                                                                            else if (bpoplso.title == "Regular") {
                                                                                if (bpoplso.sdmId) {
                                                                                    if (bpoplso.is_sdm_default != undefined) {
                                                                                        if (!plDefaultSdm)
                                                                                            lastProductAddedInCentry.Entries.CEntry.push({
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
                                                                            } else if (bpoplso.title == "Extra") {
                                                                                if (bpoplso.sdmId) {
                                                                                    if (bpoplso.is_sdm_default != undefined) {
                                                                                        if (plDefaultSdm)
                                                                                            lastProductAddedInCentry.Entries.CEntry.push({
                                                                                                ID: 0,
                                                                                                ItemID: bpoplso.sdmId,
                                                                                                ModCode: "WITH",
                                                                                                ModgroupID: bpopl.modGroupId ? bpopl.modGroupId : -1,
                                                                                                Name: bpopl.name,
                                                                                                OrdrMode: "OM_SAVED",
                                                                                                Weight: 0,
                                                                                            })
                                                                                        else
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

                                                                                    } else {
                                                                                        lastProductAddedInCentry.Entries.CEntry.push({
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
                                                                            }
                                                                        }
                                                                    })
                                                                    if (plDefaultSdm && !checkSendNone) {
                                                                        lastProductAddedInCentry.Entries.CEntry.push({
                                                                            ID: 0,
                                                                            ItemID: bpopl.subOptions[0].sdmId,
                                                                            ModCode: "NONE",
                                                                            ModgroupID: bpopl.subOptions[0].modGroupId ? bpopl.subOptions[0].modGroupId : -1,
                                                                            Name: bpopl.name,
                                                                            OrdrMode: "OM_SAVED",
                                                                            Weight: 0,
                                                                        })
                                                                    }
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
            let serviceAmount = payload.amount.filter(obj => { return obj.type == Constant.DATABASE.TYPE.CART_AMOUNT.TYPE.SHIPPING })
            let serviceCharge = undefined;
            if (serviceAmount && serviceAmount.length > 0)
                serviceCharge = (serviceAmount[0].amount != undefined) ? serviceAmount[0].amount : 0
            else
                serviceCharge = 0
            let order = {
                AddressID: payload.address.sdmAddressRef,
                Comps: Comps,
                // AreaID: "",//payload.address.areaId
                // CityID: "",//payload.address.areaId
                ConceptID: Constant.SERVER.SDM.CONCEPT_ID,
                CountryID: 1,//payload.store.countryId
                CustomerID: payload.sdmUserRef,
                // DateOfTrans: "",
                DeliveryChargeID: (payload['orderType'] == Constant.DATABASE.TYPE.ORDER.DELIVERY.AS) ? Constant.SERVER.DELIVERY_CHARGE_ID : undefined,
                DistrictID: -1,
                // DueTime: "",
                Entries: this.createCEntries(payload.items),
                OrderID: 0,
                OrderMode: (payload['orderType'] == Constant.DATABASE.TYPE.ORDER.DELIVERY.AS) ? Constant.DATABASE.TYPE.ORDER.DELIVERY.SDM : Constant.DATABASE.TYPE.ORDER.PICKUP.SDM,
                OrderType: 0,
                ProvinceID: 7,
                ServiceCharge: serviceCharge,
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
                this.orderFailureHandler(payload, 1, createOrder.ResultText, false)
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
            let amount = cartData.amount
            if (address.addressType == Constant.DATABASE.TYPE.ORDER.PICKUP.AS) {
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
                userId: userData.id,
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
                orderConfirmationNotified: false,
                env: Constant.SERVER.ENV[config.get("env")]
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

    async initiatePaymentHandler(headers: ICommonRequest.IHeaders, paymentMethodId: number, order: IOrderRequest.IOrderData, totalAmount: number) {
        try {
            let noonpayRedirectionUrl = ""
            switch (paymentMethodId) {
                case Constant.DATABASE.TYPE.PAYMENT_METHOD_ID.COD: {
                    order = await this.updateOneEntityMdb({ _id: order._id }, {
                        payment: {
                            paymentMethodId: paymentMethodId,
                            amount: totalAmount,
                            name: Constant.DATABASE.TYPE.PAYMENT_METHOD.TYPE.COD
                        }
                    })
                    CMS.OrderCMSE.updateOrder({
                        order_id: order.cmsOrderRef,
                        payment_status: Constant.DATABASE.STATUS.PAYMENT.INITIATED,
                        order_status: Constant.DATABASE.STATUS.ORDER.PENDING.CMS,
                        sdm_order_id: order.sdmOrderRef
                    })
                    break;
                }
                case Constant.DATABASE.TYPE.PAYMENT_METHOD_ID.CARD: {
                    let initiatePaymentObj: IPaymentGrpcRequest.IInitiatePaymentRes = await paymentService.initiatePayment({
                        orderId: order.cmsOrderRef.toString(),
                        amount: totalAmount,
                        storeCode: Constant.DATABASE.STORE_CODE.MAIN_WEB_STORE,
                        paymentMethodId: Constant.DATABASE.TYPE.PAYMENT_METHOD_ID.CARD,
                        channel: "Mobile",
                        locale: (headers.language == Constant.DATABASE.LANGUAGE.EN) ? Constant.DATABASE.PAYMENT_LOCALE.EN : Constant.DATABASE.PAYMENT_LOCALE.AR,
                    })
                    noonpayRedirectionUrl = initiatePaymentObj.noonpayRedirectionUrl
                    order = await this.updateOneEntityMdb({ _id: order._id }, {
                        $addToSet: {
                            transLogs: initiatePaymentObj
                        },
                        payment: {
                            paymentMethodId: paymentMethodId,
                            amount: totalAmount,
                            name: Constant.DATABASE.TYPE.PAYMENT_METHOD.TYPE.CARD
                        }
                    })
                    CMS.TransactionCMSE.createTransaction({
                        order_id: order.cmsOrderRef,
                        message: initiatePaymentObj.paymentStatus,
                        type: Constant.DATABASE.STATUS.TRANSACTION.AUTHORIZATION.CMS,
                        payment_data: {
                            id: initiatePaymentObj.noonpayOrderId.toString(),
                            data: JSON.stringify(initiatePaymentObj)
                        }
                    })
                    CMS.OrderCMSE.updateOrder({
                        order_id: order.cmsOrderRef,
                        payment_status: Constant.DATABASE.STATUS.PAYMENT.INITIATED,
                        order_status: Constant.DATABASE.STATUS.ORDER.PENDING.CMS,
                        sdm_order_id: order.sdmOrderRef
                    })
                    break;
                }
                default: {
                    consolelog(process.cwd(), `Unhandled Payment method order id : ${order._id}`, "", true)
                    break;
                }
            }
            return { noonpayRedirectionUrl, order }
        } catch (error) {
            consolelog(process.cwd(), "initiatePaymentHandler", JSON.stringify(error), false)
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
                    consolelog(process.cwd(), `old sdm status : ${order.sdmOrderRef} : ${oldSdmStatus}`, "", true)
                    if ((order.createdAt + (30 * 60 * 60 * 1000)) < new Date().getTime()) {
                        consolelog(process.cwd(), `stop fetching order detail from sdm after 30 mins : ${new Date()}`, "", true)
                        recheck = false
                    }
                    if (recheck) {
                        if (order.sdmOrderRef && order.sdmOrderRef != 0) {
                            let sdmOrder = await OrderSDME.getOrderDetail({ sdmOrderRef: order.sdmOrderRef, language: order.language })
                            consolelog(process.cwd(), `current sdm status : ${order.sdmOrderRef} : ${sdmOrder.Status}`, "", true)
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
                                            consolelog(process.cwd(), `UNHANDLED SDM ORDER STATUS for orderId : ${order.sdmOrderRef} : ${parseInt(sdmOrder.Status)} : `, parseInt(sdmOrder.Status), true)
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

                            consolelog(process.cwd(), `final orderstatus: ${order.sdmOrderRef} :  ${order.status}, recheck: ${recheck}, timeInterval: ${payload.timeInterval}`, "", true)
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
            consolelog(process.cwd(), `Amount validation check order mode : ${sdmOrder.OrderMode}`, "", true)
            let totalAmount = order.amount.filter(obj => { return obj.type == Constant.DATABASE.TYPE.CART_AMOUNT.TYPE.TOTAL })
            let amountToCompare = totalAmount[0].amount
            consolelog(process.cwd(), `amountValidationHandler 1 : totalAmount : ${totalAmount[0].amount}, sdmTotal : ${sdmOrder.Total}`, "", true)
            if (parseInt(sdmOrder.OrderMode) == Constant.DATABASE.TYPE.ORDER.DELIVERY.SDM) {
                /**
                 *@description Delivery order
                 */
                let deliveryCharge = order.amount.filter(obj => { return obj.type == Constant.DATABASE.TYPE.CART_AMOUNT.TYPE.SHIPPING })
                consolelog(process.cwd(), `amountValidationHandler 2 : deliveryCharge : ${deliveryCharge}`, "", true)
                amountToCompare = amountToCompare - deliveryCharge[0].amount
            }
            consolelog(process.cwd(), `amountValidationHandler 3 : amountToCompare : ${amountToCompare}, sdmOrder.Total : ${sdmOrder.Total}`, "", true)

            if (
                ((parseInt(sdmOrder.OrderMode) == Constant.DATABASE.TYPE.ORDER.DELIVERY.SDM) && (amountToCompare == parseFloat(sdmOrder.Total) || totalAmount[0].amount == parseFloat(sdmOrder.Total))) ||
                ((parseInt(sdmOrder.OrderMode) == Constant.DATABASE.TYPE.ORDER.PICKUP.SDM) && (amountToCompare == parseFloat(sdmOrder.Total)))
            ) {
                order = await this.updateOneEntityMdb({ _id: order._id }, { amountValidationPassed: true }, { new: true })
            } else {
                consolelog(process.cwd(), `amountValidationHandler 4`, "", true)
                recheck = false
                order = await this.orderFailureHandler(order, 1, Constant.STATUS_MSG.SDM_ORDER_VALIDATION.ORDER_AMOUNT_MISMATCH, false)
            }

            return { recheck, order }
        } catch (error) {
            consolelog(process.cwd(), "amountValidationHandler", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async validationRemarksHandler(recheck: boolean, order: IOrderRequest.IOrderData, sdmOrder) {
        try {
            consolelog(process.cwd(), `validation remarks check : ${sdmOrder.ValidationRemarks}`, "", true)
            if (recheck && sdmOrder.ValidationRemarks &&
                (sdmOrder.ValidationRemarks != null || sdmOrder.ValidationRemarks != "null") &&
                sdmOrder.ValidationRemarks != Constant.STATUS_MSG.SDM_ORDER_VALIDATION.EXCEED_ORDER_AMOUNT
            ) {
                consolelog(process.cwd(), `validationRemarksHandler 1`, "", true)
                recheck = false
                order = await this.orderFailureHandler(order, 1, sdmOrder.ValidationRemarks, false)
            }
            return { recheck, order }
        } catch (error) {
            consolelog(process.cwd(), "validationRemarksHandler", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async maxPendingReachedHandler(order: IOrderRequest.IOrderData) {
        try {
            return await this.orderFailureHandler(order, 1, Constant.STATUS_MSG.SDM_ORDER_VALIDATION.MAX_PENDING_TIME_REACHED, false)
        } catch (error) {
            consolelog(process.cwd(), "maxPendingReachedHandler", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async sdmPendingOrderHandler(recheck: boolean, oldSdmStatus: number, order: IOrderRequest.IOrderData, sdmOrder) {
        try {
            consolelog(process.cwd(), ` PENDING : current sdm status: ${order.sdmOrderRef} : ${sdmOrder.Status}, old sdm status : ${oldSdmStatus}`, "", true)
            if (order && order._id) {
                if (order.payment) {
                    switch (order.payment.paymentMethodId) {
                        case Constant.DATABASE.TYPE.PAYMENT_METHOD_ID.COD: {
                            break;
                        }
                        case Constant.DATABASE.TYPE.PAYMENT_METHOD_ID.CARD: {
                            consolelog(process.cwd(), "PENDING 1:       ", parseInt(sdmOrder.Status), true)
                            switch (parseInt(sdmOrder.Status)) {
                                case 96: {
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
                                                order = await this.orderFailureHandler(
                                                    order,
                                                    1,
                                                    Constant.STATUS_MSG.SDM_ORDER_VALIDATION.PAYMENT_ADD_ON_SDM_FAILURE,
                                                    false)
                                            }
                                        }
                                    }
                                    break;
                                }
                                case 0: {
                                    break;
                                }
                                case 1: {
                                    break;
                                }
                                default: {
                                    consolelog(process.cwd(), "Unhandled Pending sub status", parseInt(sdmOrder.Status), true)
                                    break;
                                }
                            }
                            break;
                        }
                        default: {
                            consolelog(process.cwd(), `Unhandled Payment method order id : ${order.sdmOrderRef} : ${order._id}`, "", true)
                            break;
                        }
                    }
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
            consolelog(process.cwd(), ` CONFIRMED : current sdm status : ${sdmOrder.Status}, old sdm status : ${oldSdmStatus}`, "", true)
            if (order && order._id) {
                if (oldSdmStatus != parseInt(sdmOrder.Status)) {
                    consolelog(process.cwd(), "CONFIRMED 1 :       ", parseInt(sdmOrder.Status), true)
                    if (order.payment) {
                        switch (order.payment.paymentMethodId) {
                            case Constant.DATABASE.TYPE.PAYMENT_METHOD_ID.COD: {
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
                                break;
                            }
                            case Constant.DATABASE.TYPE.PAYMENT_METHOD_ID.CARD: {
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
                                    if (captureStatus) {
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
                                        if (order && order._id) {
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
                                break;
                            }
                            default: {
                                consolelog(process.cwd(), `Unhandled Payment method order id : ${order._id}`, "", true)
                                break;
                            }
                        }
                    }
                }
                if (!order.orderConfirmationNotified) {
                    // send notification(sms + email) on order confirmation
                    let isDelivery = order.orderType === Constant.DATABASE.TYPE.ORDER.DELIVERY.AS;
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
            consolelog(process.cwd(), "sdmConfirmedHandler", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async sdmReadyHandler(recheck: boolean, oldSdmStatus: number, order: IOrderRequest.IOrderData, sdmOrder) {
        try {
            consolelog(process.cwd(), ` READY : current sdm status : ${sdmOrder.Status}, old sdm status : ${oldSdmStatus}`, "", true)
            if (order && order._id) {
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
                    if (order.orderType == Constant.DATABASE.TYPE.ORDER.PICKUP.AS)
                        recheck = false
                }
            }
            return { recheck, order }
        } catch (error) {
            consolelog(process.cwd(), "sdmReadyHandler", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async sdmOnTheWayHandler(recheck: boolean, oldSdmStatus: number, order: IOrderRequest.IOrderData, sdmOrder) {
        try {
            consolelog(process.cwd(), ` ON_THE_WAY : current sdm status : ${sdmOrder.Status}, old sdm status : ${oldSdmStatus}`, "", true)
            if (order && order._id) {
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
            }
            return { recheck, order }
        } catch (error) {
            consolelog(process.cwd(), "sdmOnTheWayHandler", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async sdmDeliveredHandler(recheck: boolean, oldSdmStatus: number, order: IOrderRequest.IOrderData, sdmOrder) {
        try {
            consolelog(process.cwd(), ` DELIVERED : current sdm status : ${sdmOrder.Status}, old sdm status : ${oldSdmStatus}`, "", true)
            if (order && order._id) {
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
            }
            return { recheck, order }
        } catch (error) {
            consolelog(process.cwd(), "sdmDeliveredHandler", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async sdmCancelledHandler(recheck: boolean, oldSdmStatus: number, order: IOrderRequest.IOrderData, sdmOrder) {
        try {
            consolelog(process.cwd(), ` CANCELED : current sdm status : ${sdmOrder.Status}, old sdm status : ${oldSdmStatus}`, "", true)
            if (order && order._id) {
                if ((oldSdmStatus < parseInt(sdmOrder.Status)) && (oldSdmStatus != parseInt(sdmOrder.Status))) {
                    consolelog(process.cwd(), "CANCELED 1 :       ", parseInt(sdmOrder.Status), true)
                    recheck = false
                    if (order.payment) {
                        let dataToUpdateOrder = {
                            isActive: 0,
                            status: Constant.DATABASE.STATUS.ORDER.CANCELED.MONGO,
                            updatedAt: new Date().getTime()
                        }
                        switch (order.payment.paymentMethodId) {
                            case Constant.DATABASE.TYPE.PAYMENT_METHOD_ID.COD: {
                                consolelog(process.cwd(), "CANCELED 2 :       ", parseInt(sdmOrder.Status), true)
                                CMS.OrderCMSE.updateOrder({
                                    order_id: order.cmsOrderRef,
                                    payment_status: Constant.DATABASE.STATUS.PAYMENT.FAILED,
                                    order_status: Constant.DATABASE.STATUS.ORDER.CANCELED.CMS,
                                    sdm_order_id: order.sdmOrderRef
                                })
                                break;
                            }
                            case Constant.DATABASE.TYPE.PAYMENT_METHOD_ID.CARD: {
                                consolelog(process.cwd(), "CANCELED 3 :       ", parseInt(sdmOrder.Status), true)
                                let transLogs = [];
                                let reverseStatus;
                                if (order.payment && order.payment.status) {
                                    if (order.payment.status == Constant.DATABASE.STATUS.TRANSACTION.AUTHORIZATION.AS) {
                                        consolelog(process.cwd(), "CANCELED 4 :       ", parseInt(sdmOrder.Status), true)
                                        try {
                                            await paymentService.reversePayment({
                                                noonpayOrderId: parseInt(order.transLogs[1].noonpayOrderId),
                                                storeCode: Constant.DATABASE.STORE_CODE.MAIN_WEB_STORE
                                            })
                                            dataToUpdateOrder['payment.status'] = Constant.DATABASE.STATUS.TRANSACTION.VOID_AUTHORIZATION.AS
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
                                    } else if (order.payment.status == Constant.DATABASE.STATUS.TRANSACTION.CAPTURE.AS) {
                                        consolelog(process.cwd(), "CANCELED 5 :       ", parseInt(sdmOrder.Status), true)
                                        try {
                                            await paymentService.refundPayment({
                                                noonpayOrderId: parseInt(order.transLogs[1].noonpayOrderId),
                                                storeCode: Constant.DATABASE.STORE_CODE.MAIN_WEB_STORE,
                                                amount: parseInt(order.transLogs[2].transactions[0].amount),
                                                captureTransactionId: order.transLogs[2].transactions[0].id
                                            })
                                            dataToUpdateOrder['payment.status'] = Constant.DATABASE.STATUS.TRANSACTION.REFUND.AS
                                        } catch (refundError) {
                                            if (refundError.data) {
                                                if (refundError.data.actionHint == Constant.DATABASE.TYPE.PAYMENT_ACTION_HINTS.STATUS_USING_NOONPAY_ID) {
                                                    transLogs.push(refundError.data)
                                                } else if (refundError.data.actionHint == Constant.DATABASE.TYPE.PAYMENT_ACTION_HINTS.SYNC_CONFIGURATION) {
                                                    transLogs.push(refundError.data)
                                                } else {
                                                    consolelog(process.cwd(), "unhandled payment error refund", "", false)
                                                }
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
                                                consolelog(process.cwd(), "unhandled payment error reverse or refund status", "", false)
                                            }
                                        }
                                    }
                                    if (transLogs && transLogs.length > 0)
                                        dataToUpdateOrder['$addToSet'] = {
                                            transLogs: { $each: transLogs.reverse() }
                                        }
                                }
                                if (reverseStatus && order && order._id) {
                                    consolelog(process.cwd(), "CANCELED 6 :       ", parseInt(sdmOrder.Status), true)
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
                                break;
                            }
                            default: {
                                consolelog(process.cwd(), `Unhandled Payment method order id : ${order._id}`, "", true)
                                break;
                            }
                        }
                        order = await this.updateOneEntityMdb({ _id: order._id }, dataToUpdateOrder, { new: true })
                        if (order && order._id) {
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
                    }
                }
            }
            return { recheck, order }
        } catch (error) {
            consolelog(process.cwd(), "sdmCancelledHandler", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async orderFailureHandler(order: IOrderRequest.IOrderData, voidReason: number, validationRemarks: string, changePaymentMode: boolean) {
        try {
            if (order && order._id) {
                consolelog(process.cwd(), ` FAILURE HANDLER : voidReason : ${voidReason}, validationRemarks : ${validationRemarks}, changePaymentMode : ${changePaymentMode}`, "", true)
                OrderSDME.cancelOrder({
                    sdmOrderRef: order.sdmOrderRef,
                    voidReason: voidReason,
                    validationRemarks: validationRemarks,
                    language: order.language
                })
                let dataToUpdateOrder = {
                    isActive: 0,
                    status: Constant.DATABASE.STATUS.ORDER.FAILURE.MONGO,
                    updatedAt: new Date().getTime(),
                    validationRemarks: validationRemarks,
                    changePaymentMode: changePaymentMode
                }
                if (order.payment) {
                    switch (order.payment.paymentMethodId) {
                        case Constant.DATABASE.TYPE.PAYMENT_METHOD_ID.COD: {
                            consolelog(process.cwd(), `FAILURE HANDLER 1 : ${Constant.DATABASE.TYPE.PAYMENT_METHOD_ID.COD}`, "", true)
                            CMS.OrderCMSE.updateOrder({
                                order_id: order.cmsOrderRef,
                                payment_status: Constant.DATABASE.STATUS.TRANSACTION.VOID_AUTHORIZATION.AS,
                                order_status: Constant.DATABASE.STATUS.ORDER.FAILURE.CMS,
                                sdm_order_id: order.sdmOrderRef
                            })
                            break;
                        }
                        case Constant.DATABASE.TYPE.PAYMENT_METHOD_ID.CARD: {
                            consolelog(process.cwd(), `FAILURE HANDLER 2 : ${Constant.DATABASE.TYPE.PAYMENT_METHOD_ID.CARD}`, "", true)
                            let transLogs = [];
                            let reverseStatus;
                            if (order.payment && order.payment.status) {
                                if (order.payment.status == Constant.DATABASE.STATUS.TRANSACTION.AUTHORIZATION.AS) {
                                    consolelog(process.cwd(), `FAILURE HANDLER 3`, "", true)
                                    try {
                                        await paymentService.reversePayment({
                                            noonpayOrderId: parseInt(order.transLogs[1].noonpayOrderId),
                                            storeCode: Constant.DATABASE.STORE_CODE.MAIN_WEB_STORE
                                        })
                                        dataToUpdateOrder['payment.status'] = Constant.DATABASE.STATUS.TRANSACTION.VOID_AUTHORIZATION.AS
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
                                } else if (order.payment.status == Constant.DATABASE.STATUS.TRANSACTION.CAPTURE.AS) {
                                    consolelog(process.cwd(), `FAILURE HANDLER 4`, "", true)
                                    try {
                                        await paymentService.refundPayment({
                                            noonpayOrderId: parseInt(order.transLogs[1].noonpayOrderId),
                                            storeCode: Constant.DATABASE.STORE_CODE.MAIN_WEB_STORE,
                                            amount: parseInt(order.transLogs[2].transactions[0].amount),
                                            captureTransactionId: order.transLogs[2].transactions[0].id
                                        })
                                        dataToUpdateOrder['payment.status'] = Constant.DATABASE.STATUS.TRANSACTION.REFUND.AS
                                    } catch (refundError) {
                                        if (refundError.data) {
                                            if (refundError.data.actionHint == Constant.DATABASE.TYPE.PAYMENT_ACTION_HINTS.STATUS_USING_NOONPAY_ID) {
                                                transLogs.push(refundError.data)
                                            } else if (refundError.data.actionHint == Constant.DATABASE.TYPE.PAYMENT_ACTION_HINTS.SYNC_CONFIGURATION) {
                                                transLogs.push(refundError.data)
                                            } else {
                                                consolelog(process.cwd(), "unhandled payment error refund", "", false)
                                            }
                                        }
                                    }
                                } else {
                                    consolelog(process.cwd(), `FAILURE HANDLER 5`, "", true)

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
                                            consolelog(process.cwd(), "unhandled payment error reverse or refund status", "", false)
                                        }
                                    }
                                }
                                if (transLogs && transLogs.length > 0)
                                    dataToUpdateOrder['$addToSet'] = {
                                        transLogs: { $each: transLogs.reverse() }
                                    }
                            }
                            if (reverseStatus) {
                                consolelog(process.cwd(), `FAILURE HANDLER 6`, "", true)
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
                            break;
                        }
                        default: {
                            consolelog(process.cwd(), `Unhandled Payment method order id : ${order._id}`, "", true)
                            break;
                        }
                    }
                    order = await this.updateOneEntityMdb({ _id: order._id }, dataToUpdateOrder, { new: true })
                    if (order && order._id) {
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
            return order
        } catch (error) {
            consolelog(process.cwd(), "orderFailureHandler", JSON.stringify(error), false)
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
            let skip = (limit * (parseInt(payload.page.toString()) - 1));
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
            nextPage = (getOrderHistory.length == limit) ? (parseInt(payload.page.toString()) + 1) : -1
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
