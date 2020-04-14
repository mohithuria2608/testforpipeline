import { CronJob } from 'cron';
import { consolelog } from '../utils'
import { orderController } from '../controllers';

export const job = new CronJob('0 */2 * * * *', function () {
    consolelog(process.cwd(), 'Bootstraping orders every minute', new Date(), true);
    orderController.getSdmOrderScheduler()
}, null, true);
