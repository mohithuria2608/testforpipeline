

import * as kafka from 'kafka-node';
import { consolelog } from "../utils"


class KafkaClientClass {

    kafkaClient: kafka.KafkaClient;

    constructor() {
        this.kafkaClient = new kafka.KafkaClient({
            kafkaHost: 'localhost:9093',
            sasl: { mechanism: 'plain', username: 'kafka', password: 'kafka' }
        })
        this.kafkaClient.on('error', (err) => {
            consolelog('Kafka client error in connection', err, false)
        });
    }

    getKafkaInstance() {
        return this.kafkaClient;
    }
}

export const kafkaClient = new KafkaClientClass();