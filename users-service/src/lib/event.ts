const EventEmitter = require('events');

class Event extends EventEmitter { }

export const event = new Event();

event.on('logger', (data: ICommonRequest.IActivityLogger) => {
    console.log('an activity logged', data);
});
