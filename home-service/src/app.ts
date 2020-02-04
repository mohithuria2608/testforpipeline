import * as config from "config"
import * as Koa from 'koa'
require('./grpc/server')
import { bootstrap, consolelog } from './utils'
import middleware from './middlewares'
import route from './route'


const app = new Koa()


app.use(middleware());
app.use(route());

export const start = (async () => {
  try {
    const port = config.get("server.home.port")
    const server = app.listen(port)

    await bootstrap(server)


    let a: IHomeRequest.Home[] = [
      {
        "id": 1,
        "sequence": 1,
        "widgetType": "top_banner",
        "status": 1,
        "media": [
          {
            "sequence": 1,
            "mediaUrl": "banner.png",
            "mediaType": "image",
            "extension": "png",
            "theme": "light",
            "bgColorCode": "#000000",
            "action": {
              "id": 1,
              "type": "menu",
              "delimeters": "delimeters"
            }
          },
          {
            "sequence": 2,
            "mediaUrl": "banner.png",
            "mediaType": "image",
            "extension": "png",
            "theme": "light",
            "bgColorCode": "#000000",
            "action": {
              "id": 1,
              "type": "menu",
              "delimeters": "delimeters"
            }
          },
          {
            "sequence": 3,
            "mediaUrl": "banner.png",
            "mediaType": "image",
            "extension": "png",
            "theme": "light",
            "bgColorCode": "#000000",
            "action": {
              "id": 1,
              "type": "menu",
              "delimeters": "delimeters"
            }
          },
        ]
      },
      {
        "id": 2,
        "sequence": 2,
        "widgetType": "menu",
        "title": "Explore Menu",
        "status": 1,
        "ctaAction": {
          "title": "View all",
          "id": 1,
          "type": "product",
          "delimeters": "delimeters"
        },
        "media": [
          {
            "sequence": 1,
            "mediaUrl": "banner.png",
            "extension": "png",
            "action": {
              "id": 1,
              "type": "menu",
              "delimeters": " 1"
            }
          },
          {
            "sequence": 2,
            "mediaUrl": "banner.png",
            "extension": "png",
            "action": {
              "id": 1,
              "type": "menu",
              "delimeters": "delimeters"
            }
          },
          {
            "sequence": 3,
            "mediaUrl": "banner.png",
            "extension": "png",
            "action": {
              "id": 1,
              "type": "menu",
              "delimeters": "delimeters"
            }
          },
          {
            "sequence": 4,
            "mediaUrl": "banner.png",
            "extension": "png",
            "action": {
              "id": 1,
              "type": "menu",
              "delimeters": "delimeters"
            }
          },
          {
            "sequence": 5,
            "mediaUrl": "banner.png",
            "extension": "png",
            "action": {
              "id": 1,
              "type": "menu",
              "delimeters": "delimeters"
            }
          }
        ]
      },
      {
        "id": 3,
        "sequence": 3,
        "widgetType": "products_list1",
        "title": "Best Sellers",
        "status": 1,
        "ctaAction": {
          "title": "View all",
          "id": 1,
          "type": "product",
          "delimeters": "delimeters"
        },
        "products": [
          {
            "sequence": 1,
            "action": {
              "id": 1,
              "type": "menu",
              "delimeters": "delimeters"
            }
          },
          {
            "sequence": 2,
            "action": {
              "id": 1,
              "type": "menu",
              "delimeters": "delimeters"
            }
          },
          {
            "sequence": 3,
            "action": {
              "id": 1,
              "type": "menu",
              "delimeters": "delimeters"
            }
          },
          {
            "sequence": 4,
            "action": {
              "id": 1,
              "type": "menu",
              "delimeters": "delimeters"
            }
          },
          {
            "sequence": 5,
            "action": {
              "id": 1,
              "type": "menu",
              "delimeters": "delimeters"
            }
          }
        ]
      },
      {
        "id": 4,
        "sequence": 4,
        "widgetType": "banner_100",
        "status": 1,
        "action": {
          "id": 1,
          "type": "product",
          "delimeters": "delimeters"
        }
      },
      {
        "id": 5,
        "sequence": 5,
        "widgetType": "products_list2",
        "title": "What's New",
        "status": 1,
        "ctaAction": {
          "title": "View all",
          "id": 1,
          "type": "product",
          "delimeters": "delimeters"
        },
        "products": [
          {
            "sequence": 1,
            "action": {
              "id": 1,
              "type": "menu",
              "delimeters": "delimeters"
            }
          },
          {
            "sequence": 2,
            "action": {
              "id": 1,
              "type": "menu",
              "delimeters": "delimeters"
            }
          },
          {
            "sequence": 3,
            "action": {
              "id": 1,
              "type": "menu",
              "delimeters": "delimeters"
            }
          },
          {
            "sequence": 4,
            "action": {
              "id": 1,
              "type": "menu",
              "delimeters": "delimeters"
            }
          },
          {
            "sequence": 5,
            "action": {
              "id": 1,
              "type": "menu",
              "delimeters": "delimeters"
            }
          }
        ]
      },
      {
        "id": 6,
        "sequence": 6,
        "widgetType": "banner_100_logo",
        "mediaUrl": "logo.png",
        "extension": "png",
        "status": 1,
        "action": {
          "id": 1,
          "type": "product",
          "delimeters": "delimeters"
        }
      },
      {
        "id": 7,
        "sequence": 7,
        "widgetType": "banner_logo_tagline",
        "content": "KFC | KENTUCKY FRIED WINGS | LOST IN THE SAUCE",
        "status": 1,
        "action": {
          "id": 1,
          "type": "product",
          "delimeters": "delimeters"
        }
      },
      {
        "id": 8,
        "sequence": 8,
        "widgetType": "bottom_video_100",
        "mediaUrl": "http://www.youtube.com",
        "extension": "mp4",
        "status": 1,
        "action": {
          "id": 1,
          "type": "product",
          "delimeters": "delimeters"
        }
      }
    ]
  } catch (error) {
    console.error(error)
  }
})()