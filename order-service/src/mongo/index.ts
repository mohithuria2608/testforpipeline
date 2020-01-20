import * as config from 'config'
import { connect, set, connection as db } from 'mongoose'
import * as Constant from '../constant'
import { consolelog } from '../utils'
const displayColors = Constant.SERVER.DISPLAY_COLOR

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
                consolelog(process.cwd(), 'Database connection closed.', error, false)

            })
        connect(self.mongoUrl, { useCreateIndex: true, useNewUrlParser: true }, function (err) {
            if (err) {
                return Promise.reject(err)
            }
            console.info(displayColors ? '\x1b[32m%s\x1b[0m' : '%s', `Connected to ${self.mongoUrl}`)
        })
        return {}
    }
}

export const Mongo = new MongoClass();