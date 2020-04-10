import * as config from "config"
import * as kafka from 'kafka-node';
import { KafkaClientClass } from './client';
import { consolelog } from "../utils"
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
                config.get("env") + "_" + Constant.KAFKA_TOPIC.FAIL_Q,
                config.get("env") + "_" + Constant.KAFKA_TOPIC.SDM_MENU,
                config.get("env") + "_" + Constant.KAFKA_TOPIC.CMS_MENU,
                config.get("env") + "_" + Constant.KAFKA_TOPIC.AS_MENU,
                config.get("env") + "_" + Constant.KAFKA_TOPIC.AS_HIDDEN,
                config.get("env") + "_" + Constant.KAFKA_TOPIC.AS_LOCATION,
                config.get("env") + "_" + Constant.KAFKA_TOPIC.AS_HOME,

                config.get("env") + "_" + Constant.KAFKA_TOPIC.SDM_USER,
                config.get("env") + "_" + Constant.KAFKA_TOPIC.CMS_USER,
                config.get("env") + "_" + Constant.KAFKA_TOPIC.AS_USER,
                config.get("env") + "_" + Constant.KAFKA_TOPIC.AS_ADDRESS,
                config.get("env") + "_" + Constant.KAFKA_TOPIC.CMS_ADDRESS,
                config.get("env") + "_" + Constant.KAFKA_TOPIC.CMS_LOCATION,
                config.get("env") + "_" + Constant.KAFKA_TOPIC.SDM_ADDRESS,
                config.get("env") + "_" + Constant.KAFKA_TOPIC.AS_PROMOTION,
                config.get("env") + "_" + Constant.KAFKA_TOPIC.SDM_ORDER,
                config.get("env") + "_" + Constant.KAFKA_TOPIC.CMS_ORDER,
                config.get("env") + "_" + Constant.KAFKA_TOPIC.AS_CONFIG,
                config.get("env") + "_" + Constant.KAFKA_TOPIC.AS_APP_VERSION,
                config.get("env") + "_" + Constant.KAFKA_TOPIC.M_LOGGER,
                // config.get("env") + "_" + Constant.KAFKA_TOPIC.CMS_LOCATION,
                config.get("env") + "_" + Constant.KAFKA_TOPIC.AS_STORE,
                config.get("env") + "_" + Constant.KAFKA_TOPIC.PING_SERVICE,
                config.get("env") + "_" + Constant.KAFKA_TOPIC.SYNC_Q,
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