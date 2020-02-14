import * as kafka from 'kafka-node';
import { KafkaClientClass } from './client';
import { consolelog } from "../utils"
import * as Constant from '../constant'

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
                Constant.KAFKA_TOPIC.FAIL_Q,
                Constant.KAFKA_TOPIC.SDM_MENU,
                Constant.KAFKA_TOPIC.CMS_MENU,
                Constant.KAFKA_TOPIC.AS_MENU,
                Constant.KAFKA_TOPIC.AS_UPSELL,
                Constant.KAFKA_TOPIC.SDM_USER,
                Constant.KAFKA_TOPIC.CMS_USER,
                Constant.KAFKA_TOPIC.AS_USER,
                Constant.KAFKA_TOPIC.AS_PROMOTION,
                Constant.KAFKA_TOPIC.SDM_ORDER,
                Constant.KAFKA_TOPIC.AS_CONFIG,
                Constant.KAFKA_TOPIC.M_LOGGER,
                Constant.KAFKA_TOPIC.AS_LOCATION,
            ], (error, data) => {
                if (error) {
                    consolelog(process.cwd(), 'Err in creating topics', JSON.stringify(error), false);
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
                consolelog(process.cwd(), 'Err in producing to kafka topic', JSON.stringify(error), false);
            } else {
                consolelog(process.cwd(), 'message produced to kafka successfully', JSON.stringify(data), true);
            }
        })
    }

}


export const kafkaProducerE = new KafkaProducer();