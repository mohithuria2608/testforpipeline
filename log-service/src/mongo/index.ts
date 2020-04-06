import * as config from 'config'
import { connect, set, connection as db } from 'mongoose'
import * as Constant from '../constant'
import { consolelog } from '../utils'
const displayColors = Constant.CONF.GENERAL.DISPLAY_COLOR

export class MongoClass {
    private mongoUrl = config.get('mongo.url')

    constructor() { }

    async init() {
        let self = this
        set('debug', true)
        set('useFindAndModify', false)
        set('useUnifiedTopology', true)
        db.on('error', err => { console.error('%s', err) })
            .on('close', (error) => {
                consolelog(process.cwd(), 'Database connection closed.', JSON.stringify(error), false)

            })
        connect(self.mongoUrl, { useCreateIndex: true, useNewUrlParser: true }, function (error) {
            if (error) {
                return Promise.reject(error)
            }
            console.info(displayColors ? '\x1b[32m%s\x1b[0m' : '%s', `Connected to ${self.mongoUrl}`)
        })
        return {}
    }
}


export const Mongo = new MongoClass();