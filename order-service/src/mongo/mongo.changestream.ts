import * as config from 'config'
import * as Constant from '../constant'
import { consolelog } from '../utils'
import * as ENTITY from '../entity'


export class ChangeStream {
    constructor() { }

    async ordercronWatch(db) {
        try {
            let ordercronCollection = db.collection('ordercron');
            let ordercronChangeStream = ordercronCollection.watch({ fullDocument: "updateLookup" });
            ordercronChangeStream.on('change', async (change) => {
                consolelog(process.cwd(), 'listening changes on ordercron', JSON.stringify(change), true)
                switch (change.operationType) {
                    case Constant.DATABASE.TYPE.MONGO_OPERATION.DELETE: {
                        ENTITY.OrdercronE.deleteOrdercronTigger(change)
                        break;
                    }
                }
            });
            return {}
        } catch (error) {
            consolelog(process.cwd(), 'ordercronWatch', error, false)
            return Promise.reject(error)
        }
    }
}

export const ChangeStreamC = new ChangeStream();

