import { consolelog } from '../utils';
import * as Constant from '../constant';
import { kafkaService } from '../grpc/client';
const EventEmitter = require('events');

class Event extends EventEmitter { }

export const event = new Event();

event.on('logger', (data: ICommonRequest.IActivityLogger) => {
    consolelog(process.cwd(), "activity log", JSON.stringify(data), true)
    kafkaService.kafkaSync({
        set: Constant.SET_NAME.LOGGER,
        mdb: {
            create: true,
            argv: JSON.stringify(data)
        },
        inQ: true
    })
});
