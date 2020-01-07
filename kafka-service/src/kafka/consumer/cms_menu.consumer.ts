import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog } from "../../utils"
import { userService, menuService } from "../../grpc/client"
import { kafkaController } from '../../controllers'

class CmsMenuConsumer extends BaseConsumer {

    constructor() {
        super(Constant.KAFKA_TOPIC.CMS_MENU, 'client');
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: IMenuGrpcRequest.ISyncToCMSMenuData) => {
                consolelog(process.cwd(), "consumer cms_menu", JSON.stringify(message), true)
                if (message.type === Constant.KAFKA.CMS.MENU.TYPE.SYNC) {
                    this.syncMenuToCMSGrpc(message);
                } else this.updateMenuFromCMSGrpc(message);
                return null
            })
    }

    private async syncMenuToCMSGrpc(message: IMenuGrpcRequest.ISyncToCMSMenuData) {
        try {
            let res = await menuService.syncMenuOnCms(message)
            return res
        } catch (err) {
            consolelog(process.cwd(), "syncMenuToCMSGrpc", err, false);
            if (message.count != 0) {
                message.count = message.count - 1
                kafkaController.syncToCmsMenu(message)
            }
            else
                kafkaController.produceToFailureTopic(message)
            return {}
        }
    }

    private async updateMenuFromCMSGrpc(message: IMenuGrpcRequest.ISyncToCMSMenuData) {
        try {
            let res = await menuService.updateMenu(message)
            return res
        } catch (err) {
            consolelog(process.cwd(), "updateMenuFromCMSGrpc", err, false);
            if (message.count != 0) {
                message.count = message.count - 1
                kafkaController.updateMenuFromCMS(message)
            }
            else
                kafkaController.produceToFailureTopic(message)
            return {}
        }
    }


}


export const cms_menuConsumerE = new CmsMenuConsumer();