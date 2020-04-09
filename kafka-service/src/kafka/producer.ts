import * as config from "config"
import * as kafka from 'kafka-node';
import { KafkaClientClass } from './client';
import { consolelog, topicNameCreator } from "../utils"
import * as Constant from '../constant'
import { kafkaController } from '../controllers';

class KafkaProducer {

    producer: kafka.Producer;

    constructor() {
        this.producer = new kafka.Producer(new KafkaClientClass().getKafkaInstance(), {
            partitionerType: 2,
            requireAcks: 1,
        });

        this.producer.on('error', function (error) { consolelog(process.cwd(), 'Err in starting the producer', JSON.stringify(error), false); })

        this.producer.on('ready', () => {
            this.producer.createTopics([
                topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.FAIL_Q),
                topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.SDM_MENU),
                topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.CMS_MENU),
                topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.AS_MENU),
                topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.AS_HIDDEN),
                topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.AS_LOCATION),
                topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.AS_HOME),
                topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.SDM_USER),
                topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.CMS_USER),
                topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.AS_USER),
                topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.AS_ADDRESS),
                topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.CMS_ADDRESS),
                topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.CMS_LOCATION),
                topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.SDM_ADDRESS),
                topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.AS_PROMOTION),
                topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.SDM_ORDER),
                topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.CMS_ORDER),
                topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.AS_CONFIG),
                topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.AS_APP_VERSION),
                topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.M_LOGGER),
                topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.AS_STORE),
                topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.PING_SERVICE),
                topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.RETRY1),
                topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.RETRY2),
                topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.RETRY3),
            ], (error, data) => {
                if (error) {
                    consolelog(process.cwd(), 'Err in creating topics', error, false);
                } else {
                    consolelog(process.cwd(), 'kafka topics created successfully', data, true);
                }
            });
        });
    }

    sendMessage(req: kafka.ProduceRequest) {
        this.producer.send([
            {
                partition: req.partition,
                topic: req.topic,
                messages: req.messages,
            }
        ], (error, data) => {
            if (error) {
                let messages = JSON.parse(req.messages)
                messages['inQ'] = false
                kafkaController.kafkaSync(messages)
                consolelog(process.cwd(), 'Err in producing to kafka topic', JSON.stringify(error), false);
            } else {
                consolelog(process.cwd(), 'message produced to kafka successfully', JSON.stringify(data), true);
            }
        })
    }

}


export const kafkaProducerE = new KafkaProducer();