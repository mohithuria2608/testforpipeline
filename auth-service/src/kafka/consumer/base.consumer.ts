import * as kafka from 'kafka-node';
import * as Constant from '../../constant'
import { kafkaClient } from '../client';
import { Observable, Subject } from 'rxjs';
import { consolelog } from "../../utils"

export class BaseConsumer {

    protected consumer: kafka.Consumer;
    private topic: string;

    private _onMessage: Subject<any> = new Subject();
    constructor(topic: Constant.KAFKA_TOPIC, groupId?: string) {
        this.topic = topic;
        this.initConsumer(groupId);
        this.handleMessages();
        this.consumer.setOffset(topic, 0, 0);
        this.consumer.addTopics(
            [topic],
            (err, data) => {
                if (err) {
                    consolelog(`Consumer ${topic} in nudge ${err}`, [], false);
                } else {
                    consolelog(`Consumer ${topic} in nudge up successfully`, [], true);
                }
            });
    }

    private initConsumer(groupId?: string) {
        const consumerData = {
            topic: this.topic,
            partition: 0
        };
        if (groupId) {
            consumerData['groupId'] = groupId;
        }
        this.consumer = new kafka.Consumer(
            kafkaClient.getKafkaInstance(),
            [
                consumerData
            ],
            {
                autoCommit: true,

            }
        );
    }

    protected onMessage<T>(): Observable<T> {
        return this._onMessage.asObservable();
    }

    /**
     * @description When message is incoming then will intercept the  message and 
     * distribute to all the subscribers through subject (Observable)
     */
    private handleMessages() {
        this.consumer.on('message', (message) => {
            try {
                const parsedMessage = JSON.parse(message.value as string);
                this._onMessage.next(parsedMessage);
            } catch (err) {
                consolelog(`Error while parsing payload of topic ${this.topic} in nudge ${err}`, [], false);
            }
        });

        this.consumer.on('error', (err) => {
            consolelog(`Error while parsing payload of topic ${this.topic} in nudge ${err}`, [], false);
        })

        this.consumer.on('offsetOutOfRange', function (err) {
            consolelog(`Offset out of range ${this.topic} in nudge ${err}`, [], false);
        });
    }
}