import * as Constant from '../constant'
import * as kafka from 'kafka-node';
import { kafkaClient } from './client';
import { consolelog } from "../utils"

class KafkaProducer {

    producer: kafka.Producer;

    constructor() {
        this.producer = new kafka.Producer(kafkaClient.getKafkaInstance(), {
            partitionerType: 2,
            requireAcks: 1,
        });

        this.producer.on('error', function (err) { consolelog('Err in starting the producer', err, false); })

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
                Constant.KAFKA_TOPIC.CREATE_TOKEN
            ], (err, data) => {
                if (err) {
                    consolelog('Err in creating topics', err, false);
                } else {
                    consolelog('kafka topics created successfully', data, true);
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
        ], (err, data) => {
            if (err) {
                consolelog('Err in producing to kafka topic', err, false);
            } else {
                consolelog('message produced to kafka successfully', data, true);
            }
        })
    }

}


export const kafkaProducerE = new KafkaProducer();