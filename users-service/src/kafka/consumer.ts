import * as kafka from 'kafka-node';
import { kafkaClient } from './client';
import { Observable, Subject } from 'rxjs';
import * as helper from "../utils"

enum KAFKA_PRODUCERS {
    AUTH = 'AUTH'
}


export class KafkaConsumer {

    protected consumer: kafka.Consumer;
    private topic: string;

    private _onMessage: Subject<any> = new Subject();
    constructor(topic: KAFKA_PRODUCERS, groupId?: string) {
        this.topic = topic;
        this.initConsumer(groupId);
        this.handleMessages();
        this.consumer.setOffset(topic, 0, 0);
        this.consumer.addTopics(
            [topic],
            (err, data) => {
                if (err) {
                    helper.consolelog(`Consumer ${topic} in nudge ${err}`, [], false);
                } else {
                    helper.consolelog(`Consumer ${topic} in nudge up successfully`, [], true);
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
                helper.consolelog(`Error while parsing payload of topic ${this.topic} in nudge ${err}`, [], false);
            }
        });

        this.consumer.on('error', (err) => {
            helper.consolelog(`Error while parsing payload of topic ${this.topic} in nudge ${err}`, [], false);
        })

        this.consumer.on('offsetOutOfRange', function (err) {
            helper.consolelog(`Offset out of range ${this.topic} in nudge ${err}`, [], false);
        });
    }
}

