'use strict'
import { EventEmitter } from 'events'
import { mongoConnect, dbSettings } from './databases'
const mediator = new EventEmitter()

console.log('--- User Service ---')

process.on('uncaughtException', (err) => {
  console.error('Unhandled Exception', err)
})

process.on('uncaughtRejection', (err, promise) => {
  console.error('Unhandled Rejection', err)
})

mediator.on('db.ready', (db) => {
  console.error(db)
})

mediator.on('db.error', (err) => {
  console.error(err)
})

mongoConnect(dbSettings, mediator)

mediator.emit('boot.ready')
