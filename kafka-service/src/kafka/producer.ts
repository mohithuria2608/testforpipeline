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
                process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.FAIL_Q,
                process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.SDM_MENU,
                process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.CMS_MENU,
                process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.AS_MENU,
                process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.AS_HIDDEN,
                process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.AS_HOME,
                process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.SDM_USER,
                process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.CMS_USER,
                process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.AS_USER,
                process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.AS_ADDRESS,
                process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.CMS_ADDRESS,
                process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.SDM_ADDRESS,
                process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.AS_PROMOTION,
                process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.SDM_ORDER,
                process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.AS_CONFIG,
                process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.AS_APP_VERSION,
                process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.M_LOGGER,
                process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.CMS_LOCATION,
                process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.AS_STORE,
                process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.PING_SERVICE,
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