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
        "language": "En",
        "sequence": 1,
        "widgetType": "BANNER_LARGE",
        "status": 1,
        "title": "",
        "ctaAction": [],
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
          }
        ],
        "products": [],
        "content": ""
      },
      {
        "id": 2,
        "language": "En",
        "sequence": 2,
        "widgetType": "EXPLORE_MENU",
        "title": "Explore Menu",
        "status": 1,
        "ctaAction": [{
          "title": "View all",
          "id": 1,
          "type": "product",
          "delimeters": "delimeters"
        }],
        "media": [
          {
            "sequence": 1,
            "mediaUrl": "banner.png",
            "mediaType": "image",
            "extension": "png",
            "action": {
              "id": 1,
              "type": "menu",
              "delimeters": " 1"
            },
            "theme": "",
            "bgColorCode": ""
          },
          {
            "sequence": 2,
            "mediaUrl": "banner.png",
            "mediaType": "image",
            "extension": "png",
            "action": {
              "id": 1,
              "type": "menu",
              "delimeters": "delimeters"
            },
            "theme": "",
            "bgColorCode": ""
          },
          {
            "sequence": 3,
            "mediaUrl": "banner.png",
            "mediaType": "image",
            "extension": "png",
            "action": {
              "id": 1,
              "type": "menu",
              "delimeters": "delimeters"
            },
            "theme": "",
            "bgColorCode": ""
          },
          {
            "sequence": 4,
            "mediaUrl": "banner.png",
            "mediaType": "image",
            "extension": "png",
            "action": {
              "id": 1,
              "type": "menu",
              "delimeters": "delimeters"
            },
            "theme": "",
            "bgColorCode": ""
          },
          {
            "sequence": 5,
            "mediaUrl": "banner.png",
            "mediaType": "image",
            "extension": "png",
            "action": {
              "id": 1,
              "type": "menu",
              "delimeters": "delimeters"
            },
            "theme": "",
            "bgColorCode": ""
          }
        ],
        "products": [],
        "content": ""
      },
      {
        "id": 3,
        "language": "En",
        "sequence": 3,
        "widgetType": "BEST_SELLERS",
        "title": "Best Sellers",
        "status": 1,
        "ctaAction": [{
          "title": "View all",
          "id": 1,
          "type": "product",
          "delimeters": "delimeters"
        }],
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
        ],
        "media": [],
        "content": ""
      },
      {
        "id": 4,
        "language": "En",
        "sequence": 4,
        "widgetType": "BANNER_MEDIUM",
        "status": 1,
        "title": "",
        "ctaAction": [],
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
              "type": "product",
              "delimeters": "delimeters"
            }
          }
        ],
        "products": [],
        "content": ""
      },
      {
        "id": 5,
        "language": "En",
        "sequence": 5,
        "widgetType": "WHATS_NEW",
        "title": "What's New",
        "status": 1,
        "ctaAction": [{
          "title": "View all",
          "id": 1,
          "type": "product",
          "delimeters": "delimeters"
        }],
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
        ],
        "media": [],
        "content": ""
      },
      {
        "id": 6,
        "language": "En",
        "sequence": 6,
        "widgetType": "BANNER_SMALL",
        "status": 1,
        "media": [
          {
            "sequence": 1,
            "mediaUrl": "logo.png",
            "mediaType": "image",
            "extension": "png",
            "action": {
              "id": 1,
              "type": "menu",
              "delimeters": " 1"
            },
            "theme": "",
            "bgColorCode": ""
          }
        ],
        "content": "KFC | KENTUCKY FRIED WINGS | LOST IN THE SAUCE",
        "products": [],
        "title": "",
        "ctaAction": []
      },
      {
        "id": 7,
        "language": "En",
        "sequence": 7,
        "widgetType": "BANNER_VIDEO",
        "status": 1,
        "media": [
          {
            "sequence": 1,
            "mediaUrl": "www.kfc.com/kfc_uae.mp4",
            "mediaType": "video",
            "extension": "mp4",
            "action": {
              "id": 1,
              "type": "menu",
              "delimeters": "delimeters"
            },
            "theme": "",
            "bgColorCode": ""
          }
        ],
        "title": "",
        "ctaAction": [],
        "products": [],
        "content": ""
      }
    ]
  } catch (error) {
    console.error(error)
  }
})()