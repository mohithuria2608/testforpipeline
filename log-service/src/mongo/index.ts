import * as config from 'config'
import { connect, set, connection as db } from 'mongoose'
import * as Constant from '../constant'
import { consolelog } from '../utils'
const displayColors = Constant.SERVER.DISPLAY_COLOR

export class Database {
    public mongoDbUrl = config.get<string>('dbConfig.dbUrl')

    constructor() { }

    async connectMongoDatabase() {
        set('debug', true)
        set('useFindAndModify', false)
        db.on('error', err => { console.error('%s', err) })
            .on('close', (error) => {
                consolelog(process.cwd(), 'Database connection closed.', error, false)

            })
        connect(this.mongoDbUrl, { useCreateIndex: true, useNewUrlParser: true }, function (err) {
            if (err) {
                return Promise.reject(err)
            }
            console.info(displayColors ? '\x1b[32m%s\x1b[0m' : '%s', `Connected to ${this.mongoDbUrl}`)
        })
        return {}
    }
}

export const DB = new Database();