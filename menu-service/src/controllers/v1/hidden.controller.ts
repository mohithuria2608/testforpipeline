import * as fs from 'fs';
import * as Constant from "../../constant";
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import { Aerospike } from '../../aerospike'

export class HiddenController {
    constructor() { }

    /**
    * @method BOOTSTRAP
    * @description : Post bulk hidden data
    * */
    async bootstrapHidden() {
        try {
            await Aerospike.truncate({ set: ENTITY.HiddenArE.set, before_nanos: 0 })
            await Aerospike.truncate({ set: ENTITY.HiddenEnE.set, before_nanos: 0 })
            let rawdata = fs.readFileSync(__dirname + '/../../../model/hidden.json', 'utf-8');
            let menu = JSON.parse(rawdata);
            for (const iterator of menu) {
                ENTITY.HiddenArE.postHiddenMenu(iterator)
                ENTITY.HiddenEnE.postHiddenMenu(iterator)
            }
            return {}

        } catch (error) {
            consolelog(process.cwd(), "bootstrapHidden", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
    * @method GET
    * @param {string} menuId :  menu id
    * */
    async fetchHiddenProducts(headers: ICommonRequest.IHeaders, payload: IHiddenRequest.IFetchHidden) {
        try {
            payload['language'] = headers.language
            let menu = []
            switch (payload.language) {
                case Constant.DATABASE.LANGUAGE.EN: menu = await ENTITY.HiddenEnE.getHiddenProducts(payload); break;
                case Constant.DATABASE.LANGUAGE.AR: menu = await ENTITY.HiddenArE.getHiddenProducts(payload); break;
            }
            let hidden = menu.filter(elem => { return elem.name == "Upsell" })
            return (hidden && hidden.length > 0) ? hidden[0].products : []
        } catch (error) {
            consolelog(process.cwd(), "fetchHiddenProducts", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
    * @method GRPC
    * @param {string} type  enum[menu, hidden]
    * @param {string} data  actuall array of menu or hidden
    * */
    async syncFromKafka(payload: IKafkaGrpcRequest.IKafkaBody) {
        try {
            let data = JSON.parse(payload.as.argv);
            switch (data.data[0].language) {
                case Constant.DATABASE.LANGUAGE.EN: await ENTITY.HiddenEnE.postHiddenMenu(data.data[0]); break;
                case Constant.DATABASE.LANGUAGE.AR: await ENTITY.HiddenArE.postHiddenMenu(data.data[0]); break;
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncFromKafka", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
   * @method GRPC
   * @param {number} menuId :menuId
   * @param {string} language :language
   * */
    // async grpcFetchHidden(payload: IMenuGrpcRequest.IFetchMenuData) {
    //     try {
    //         let menu = {}
    //         switch (payload.language) {
    //             case Constant.DATABASE.LANGUAGE.EN: menu = await ENTITY.MenuEnE.getMenu({ menuId: payload.menuId }); break;
    //             case Constant.DATABASE.LANGUAGE.AR: menu = await ENTITY.MenuArE.getMenu({ menuId: payload.menuId }); break;
    //         }
    //         return { menu: JSON.stringify(menu) }
    //     } catch (error) {
    //         consolelog(process.cwd(), "grpcFetchHidden", JSON.stringify(error), false)
    //         return Promise.reject(error)
    //     }
    // }
}

export const hiddenController = new HiddenController();