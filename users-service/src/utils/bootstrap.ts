import * as config from 'config'
import * as utils from '../utils'
import * as Constant from '../constant/appConstants';
import { DB } from '../databases'
const displayColors = Constant.SERVER.DISPLAY_COLOR

export default async function bootstrap(server) {
    try {
        await DB.connectMongoDatabase()
    } catch (error) {
        console.error(displayColors ? '\x1b[31m%s\x1b[0m' : '%s', error.toString())
    }

    return
}