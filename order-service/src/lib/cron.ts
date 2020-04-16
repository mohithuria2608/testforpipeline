import { CronJob } from 'cron';
import { consolelog } from '../utils'
import { orderController } from '../controllers';

export const job = new CronJob('0 30 * * * *', function () {
    consolelog(process.cwd(), 'Bootstraping orders every 30 seconds', new Date(), true);
    orderController.getSdmOrderScheduler()
}, null, true);


//'Bootstraping orders every minute'  ===> '0 */1 * * * *'
