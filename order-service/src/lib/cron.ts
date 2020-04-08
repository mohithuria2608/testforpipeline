import { CronJob } from 'cron';
import { orderController } from '../controllers';

export const job = new CronJob('0 */1 * * * *', function () {
    console.log('Bootstraping orders every minute', new Date());
    orderController.getSdmOrderScheduler()
}, null, true);
