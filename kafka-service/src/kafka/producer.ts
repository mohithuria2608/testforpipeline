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

        /**
         * @param 
         * var topicsToCreate = [{
            topic: 'topic1',
            partitions: 1,
            replicationFactor: 2
        },
        {
            topic: 'topic2',
            partitions: 5,
            replicationFactor: 3,
            // Optional set of config entries
            configEntries: [
                {
                    name: 'compression.type',
                    value: 'gzip'
                },
                {
                    name: 'min.compaction.lag.ms',
                    value: '50'
                }
            ],
            // Optional explicit partition / replica assignment
            // When this property exists, partitions and replicationFactor properties are ignored
            replicaAssignment: [
                {
                    partition: 0,
                    replicas: [3, 4]
                },
                {
                    partition: 1,
                    replicas: [2, 1]
                }
            ]
        }]; */

        this.producer.on('ready', () => {
            this.producer.createTopics([
                process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.FAIL_Q,
                process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.SDM_MENU,
                process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.CMS_MENU,
                process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.AS_MENU,
                process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.AS_UPSELL,
                process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.SDM_USER,
                process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.CMS_USER,
                process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.AS_USER,
                process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.AS_PROMOTION,
                process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.SDM_ORDER,
                process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.AS_CONFIG,
                process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.M_LOGGER,
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