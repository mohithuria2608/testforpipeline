import { connect, set, connection as db } from 'mongoose'
import * as config from 'config'
import * as utils from '../utils'

export class mongo {
  private mongoDbUrl = config.get<string>('dbConfig.dbUrl')

  constructor() { }

  async mongoConnect(server) {
    set('debug', true)
    set('useFindAndModify', false)
    db.on('error', err => { console.error('Database error. ', err) })
      .on('close', (error) => {
        utils.consolelog('Database connection closed. ', error, false)

      })
    connect(this.mongoDbUrl, { useCreateIndex: true, useNewUrlParser: true }, function (err) {
      if (err) {
        console.error('Database connection error. ', err)
        return Promise.reject(err)
      }
    })
    console.info(`Connected to ${this.mongoDbUrl}`)
    return {}
  }
}

export const mongoC = new mongo();