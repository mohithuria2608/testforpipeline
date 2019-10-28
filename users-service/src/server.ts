import * as Koa from 'koa'
import { bootstrap } from './utils'
import middleware from './middlewares'
import route from './route'
const app = new Koa()


app.use(middleware());
app.use(route());

export const start = (async () => {
  try {
    const port = 3000
    const server = app.listen(port)

    await bootstrap(server)

  } catch (err) {
    console.error(err)
  }
})()