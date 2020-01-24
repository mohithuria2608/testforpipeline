import * as config from "config"
const kafka = require('kafka-node');
import { consolelog } from "../utils"

class KafkaClientClass {

    private kafkaClient

    constructor() {
        this.kafkaClient = new kafka.KafkaClient(config.get("kafka.url"))

        this.kafkaClient.on('error', (error) => {
            consolelog(process.cwd(),'Kafka client error in connection', error, false)
        });
    }

    getKafkaInstance() {
        return this.kafkaClient;
    }
}

export const kafkaClient = new KafkaClientClass();