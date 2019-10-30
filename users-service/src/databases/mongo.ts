import { connect, set, connection as db } from 'mongoose'
import * as config from 'config'
import { consolelog } from '../utils'

export class Mongo {
  private mongoUrl = config.get<string>('mongo.url')

  constructor() { }

  async mongoConnect(server) {
    set('debug', true)
    set('useFindAndModify', false)
    db.on('error', err => { consolelog('Database error. ', err, false) })
      .on('close', (err) => { consolelog('Database connection closed. ', err, false) })

    connect(this.mongoUrl, { useCreateIndex: true, useNewUrlParser: true }, function (err) {
      if (err) {
        consolelog('Database connection error. ', err, false)
        return Promise.reject(err)
      }
    })
    consolelog('Connected to ', this.mongoUrl, true)
    return {}
  }
}

export const mongoC = new Mongo();