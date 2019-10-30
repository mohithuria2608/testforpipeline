

import * as kafka from 'kafka-node';
import * as helper from "../utils"


class KafkaClientClass {

    kafkaClient: kafka.KafkaClient;

    constructor() {
        this.kafkaClient = new kafka.KafkaClient({
            kafkaHost: 'localhost:9093'
        })
        this.kafkaClient.on('error', (err) => {
            helper.consolelog('insertKeyInRedis', [err], false)
        });
    }

    getKafkaInstance() {
        helper.consolelog('Kafka client', [this.kafkaClient], false)
        return this.kafkaClient;
    }
}

export const kafkaClient = new KafkaClientClass();