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
                if (iterator.language == Constant.DATABASE.LANGUAGE.AR)
                    ENTITY.HiddenArE.postHiddenMenu(iterator)
                if (iterator.language == Constant.DATABASE.LANGUAGE.EN)
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
            if (data) {
                data = (typeof data.data == 'string') ? JSON.parse(data.data) : data.data
                switch (data[0].language) {
                    case Constant.DATABASE.LANGUAGE.EN: await ENTITY.HiddenEnE.postHiddenMenu(data[0]); break;
                    case Constant.DATABASE.LANGUAGE.AR: await ENTITY.HiddenArE.postHiddenMenu(data[0]); break;
                }
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
   * @param {string} type :MENU / FREE / UPSELL
   * */
    async grpcFetchHidden(payload: IMenuGrpcRequest.IFetchMenuData) {
        try {
            let menu = []
            switch (payload.language) {
                case Constant.DATABASE.LANGUAGE.EN: menu = await ENTITY.HiddenEnE.getHiddenProducts({ menuId: payload.menuId }); break;
                case Constant.DATABASE.LANGUAGE.AR: menu = await ENTITY.HiddenArE.getHiddenProducts({ menuId: payload.menuId }); break;
            }
            if (menu && menu.length > 0) {
                menu = menu.filter(obj => {
                    return (obj.name == Constant.DATABASE.TYPE.MENU_CATEGORY[payload.type])
                })
            }
            console.log("menu...............", JSON.stringify(menu))
            return { menu: JSON.stringify(menu) }
        } catch (error) {
            consolelog(process.cwd(), "grpcFetchHidden", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const hiddenController = new HiddenController();