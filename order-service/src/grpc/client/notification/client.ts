import * as config from "config"
import { notificationServiceValidator } from './client.validator'
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
import { consolelog } from '../../../utils'

export class NotificationService {

    private notificationProto = __dirname + config.get("directory.static.proto.notification.client");
    private packageDefinition = protoLoader.loadSync(
        this.notificationProto,
        {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
        });
    private loadNotification = grpc.loadPackageDefinition(this.packageDefinition).NotificationService
    private notificationClient = new this.loadNotification(config.get("grpc.notification.client"), grpc.credentials.createInsecure());

    constructor() {
        console.log(process.cwd(), 'GRPC connection established notification-service', config.get("grpc.notification.client"), true)
    }

    async sendNotification(payload: INotificationGrpcRequest.ISendNotification): Promise<INotificationGrpcRequest.ISendNotificationRes> {
        return new Promise(async (resolve, reject) => {
            try {
                await notificationServiceValidator.smsValidator(payload)
                this.notificationClient.sendNotification(payload, (error, res) => {
                    if (!error) {
                        consolelog(process.cwd(), "successfully created default cart", JSON.stringify(res), false)
                        resolve(res)
                    } else {
                        consolelog(process.cwd(), "Error in creating created default cart", JSON.stringify(error), false)
                        reject(error)
                    }
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

export const notificationService = new NotificationService();