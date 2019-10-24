import * as Koa from 'koa'
import * as config from '../config'
import middleware from '../middlewares'
import route from '../route'
const app = new Koa()


app.use(middleware());
app.use(route());

export const start = (async () => {
  try {
    const port = 3000
    const server = app.listen(port)

  } catch (err) {
    console.error(err)
  }
})()