import * as config from "config"
import * as Koa from 'koa'
import { bootstrap, consolelog } from './utils'
require('./grpc/server')
import middleware from './middlewares'
import route from './route'
import { event } from './lib'
import * as SDM from './sdm';
import * as Constant from './constant';

const app = new Koa()


app.use(middleware());
app.use(route());


export const start = (async () => {
  try {
    const port = config.get("server.user.port")
    const server = app.listen(port)

    // event.emit('logger', {
    //   type: Constant.DATABASE.TYPE.ACTIVITY_LOG.INFO,
    //   info: { name: "ankit" },
    //   description: "test logger",
    //   options: {
    //     env: Constant.SERVER.ENV[config.get("env")],
    //   },
    //   createdAt: new Date().getTime()
    // });
    await bootstrap(server)
    // await SDM.UserSDME.createCustomer({})
    // await SDM.UserSDME.getCustomerByUserNameAndPswd({ customerUserName: "", customerPassword: "" })
    // await SDM.UserSDME.getCustomerByEmail({ email: "abc@gmail.com" })
    // await SDM.UserSDME.getCustomersByEmail("")
    // await SDM.UserSDME.getCustomerById(7340706)
    // await SDM.UserSDME.getCustomerByMobile(1111111)
    // await UserSDME.getCustomersByPhone({ phoneNo: 1111111 })
    // await SDM.UserSDME.getsdmUserRef(1111111, "abc@gmail.com")


    interface widget {
      sequence?: number,
      widgetType?: string,
      title?: string,
      status?: number,
      ctaAction?: ctaAction
      media?: media[],
      products?: products[],
      mediaUrl?: string,
      content?: string,
      action?: action,
      extension?: string
    }

    interface ctaAction {
      title?: string,
      id?: number,
      type?: string,
      delimeters?: string,
    }
    interface media {
      sequence?: number,
      mediaUrl?: string,
      mediaType?: string,
      extension?: string,
      theme?: string,
      bgColorCode?: string,
      action?: {
        id?: number,
        type?: string,
        delimeters?: string
      }
    }
    interface products {
      sequence?: number,
      extension?: string,
      action?: {
        id?: number,
        type?: string,
        delimeters?: string
      }
    }

    interface action {
      id?: number,
      type?: string,
      delimeters?: string
    }
    let a: widget[] = [
      {
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
    console.log(a)
  } catch (error) {
    console.error(error)
  }
})()