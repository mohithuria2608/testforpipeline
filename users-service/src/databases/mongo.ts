import { connect, set, connection as db } from 'mongoose'
import * as config from 'config'
import * as helper from '../utils'

export class mongo {
  private mongoUrl = config.get<string>('mongo.url')

  constructor() { }

  async mongoConnect(server) {
    set('debug', true)
    set('useFindAndModify', false)
    db.on('error', err => {
      helper.consolelog('Database error. ', err, false)
    })
      .on('close', (error) => {
        helper.consolelog('Database connection closed. ', error, false)
      })
    connect(this.mongoUrl, { useCreateIndex: true, useNewUrlParser: true }, function (err) {
      if (err) {
        helper.consolelog('Database connection error. ', err, false)
        return Promise.reject(err)
      }
    })
    console.info(`Connected to ${this.mongoUrl}`)
    return {}
  }
}

export const mongoC = new mongo();