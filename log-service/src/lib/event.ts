import * as ENTITY from '../entity'
import { consolelog } from '../utils';

const EventEmitter = require('events');

class Event extends EventEmitter { }

export const event = new Event();

event.on('logger', (data: ICommonRequest.IActivityLogger) => {
    consolelog(process.cwd(), 'an activity logged', JSON.stringify(data), true);
    ENTITY.LoggerE.createOneEntity(data)
});
