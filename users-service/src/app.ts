import * as config from "config"
import * as Koa from 'koa'
import { bootstrap, consolelog } from './utils'
import middleware from './middlewares'
import route from './route'
import { kafkaProducerE, initConsumers } from './kafka';


const app = new Koa()


app.use(middleware());
app.use(route());

export const start = (async () => {
  try {
    const port = config.get("server.port")
    const server = app.listen(port)

    await bootstrap(server)

    // var kafka = require('kafka-node');
    // var client = new kafka.KafkaClient('localhost:9093');

    // var producer = new kafka.Producer(client, {
    //   partitionerType: 2,
    //   requireAcks: 1,
    // });

    // producer.on('ready', () => {
    //   producer.createTopics(["AUTH"], (err, data) => {
    //     if (err) {
    //       console.log("Err in creating topics", err)
    //     } else {
    //       console.log("kafka topics created successfully", data)
    //     }
    //   });
    // });

    // producer.send([
    //   {
    //     messages: JSON.stringify({ userId: "1" }),
    //     topic: 'AUTH',
    //     partition: 0,
    //   }
    // ], (err, data) => {
    //   if (err) {
    //     consolelog('Err in producing to kafka topic', err, false);
    //   } else {
    //     consolelog('message produced to kafka successfully', data, true);
    //   }
    // })

    // var consumer = new kafka.Consumer(client, []);
    // consumer.addTopics(['admin'], function (err) {
    //   if (err) console.error(err);
    // });
    // process.once('SIGINT', function () {
    //   consumer.close();
    // });

    kafkaProducerE.sendMessage({
      messages: JSON.stringify({ userId: "1" }),
      topic: 'AUTH',
      partition: 0,
    });

    initConsumers()


  } catch (err) {
    console.error(err)
  }
})()