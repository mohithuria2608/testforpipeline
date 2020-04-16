import { CronJob } from 'cron';
import { consolelog } from '../utils'
import { sdmLocationController } from '../controllers';

export const storejob = new CronJob('0 0 4 * * *', function () {
    consolelog(process.cwd(), 'Bootstraping complete stores on 4 am everyday', new Date(), true);
    sdmLocationController.syncLocationData();
}, null, true);


export const storestatusjob_0_4 = new CronJob('0 */30 0-4 * * *', function () {
    consolelog(process.cwd(), 'Bootstraping store status every 30 minutes from 0-4', new Date(), true);
    sdmLocationController.syncStoreStatusData();
}, null, true);


export const storestatusjob_10_24 = new CronJob('0 */30 10-23 * * *', function () {
    consolelog(process.cwd(), 'Bootstraping store status every 30 minutes from 10-24', new Date(), true);
    sdmLocationController.syncStoreStatusData();
}, null, true);