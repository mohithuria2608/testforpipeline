import * as config from "config"
const kafka = require('kafka-node');
import { consolelog } from "../utils"

export class KafkaClientClass {

    private kafkaClient

    constructor() {
        this.kafkaClient = new kafka.KafkaClient({ kafkaHost: config.get("kafka.url") })

        this.kafkaClient.on('error', (error) => {
            consolelog(process.cwd(), 'Kafka client error in connection', JSON.stringify(error), false)
        });
    }

    getKafkaInstance() {
        consolelog(process.cwd(), 'Kafka client connected', config.get("kafka.url"), false)

        return this.kafkaClient;
    }
}