import * as config from "config"
import * as kafka from 'kafka-node';
import * as Constant from '../../constant'
import { KafkaClientClass } from '../client';
import { Observable, Subject } from 'rxjs';
import { consolelog } from "../../utils"


export class BaseConsumer {

    protected consumer: kafka.ConsumerGroup;
    private topic: string;

    private _onMessage: Subject<any> = new Subject();
    constructor(topic: string, groupId: string) {
        this.topic = topic;
        this.initConsumer(groupId);
        this.handleMessages();
        // this.consumer.setOffset(topic, 0, 0);
        // this.consumer.addTopics(
        //     [topic],
        //     (error, data) => {
        //         if (error) {
        //             consolelog(process.cwd(), `Error: Consumer ${topic} in nudge ${error}`, "", false);
        //         } else {
        //             consolelog(process.cwd(), `Consumer ${topic} in nudge up successfully`, "", true);
        //         }
        //     });

    }

    private initConsumer(groupId: string) {
        // const consumerData = {
        //     topic: this.topic,
        //     partition: 0
        // };
        // // if (groupId) {
        // //     consumerData['groupId'] = groupId;
        // // }
        // this.consumer = new kafka.Consumer(
        //     new KafkaClientClass().getKafkaInstance(),
        //     [
        //         consumerData
        //     ],
        //     {
        //         autoCommit: false,

        //     }
        // );
        const cgOptions: kafka.ConsumerGroupOptions = {
            kafkaHost: config.get("kafka.url"),
            groupId: groupId,
            // id: 'consumerID',
            encoding: 'buffer',
            keyEncoding: 'buffer',
            sessionTimeout: 15000,
            protocol: ['roundrobin'],
            fromOffset: 'latest',
            migrateHLC: false,
            migrateRolling: true,
            // onRebalance: (isAlreadyMember, callback) => { callback(); } // or null
        }
        this.consumer = new kafka.ConsumerGroup(cgOptions, [this.topic])

        const offset = new kafka.Offset(new KafkaClientClass().getKafkaInstance());

        offset.on('ready', () => { });

        offset.fetch([{ topic: this.topic, partition: 0, time: Date.now(), maxNum: 1 }], (err: any, data: any) => {
            consolelog(process.cwd(), `offset.fetch ${this.topic} : ${err}`, [JSON.stringify(data)], false);
        });

        offset.commit(groupId, [{ topic: this.topic, partition: 0, offset: 10 }], (err, data) => {
            consolelog(process.cwd(), `commit ${this.topic} : ${err}`, [JSON.stringify(data)], false);
        });

        offset.fetchCommits(groupId, [{ topic: this.topic, partition: 0 }], (err, data) => {
            consolelog(process.cwd(), `fetchCommits ${this.topic} : ${err}`, [JSON.stringify(data)], false);
        });

        offset.fetchLatestOffsets([this.topic], (err, offsets) => {
            consolelog(process.cwd(), `fetchLatestOffsets ${this.topic} : ${err}`, [JSON.stringify(offsets)], false);
        });
        offset.fetchEarliestOffsets([this.topic], (err, offsets) => {
            consolelog(process.cwd(), `fetchEarliestOffsets ${this.topic} : ${err}`, [JSON.stringify(offsets)], false);
        });

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

            } catch (error) {
                consolelog(process.cwd(), `Error while parsing payload of topic ${this.topic} in nudge ${error}`, [], false);
            }
        });

        this.consumer.on('error', (error) => {
            consolelog(process.cwd(), `Error while parsing payload of topic ${this.topic} in nudge ${error}`, [], false);
        })

        this.consumer.on('offsetOutOfRange', function (error) {
            consolelog(process.cwd(), `Offset out of range ${this.topic} in nudge ${error}`, [], false);
        });
    }
}