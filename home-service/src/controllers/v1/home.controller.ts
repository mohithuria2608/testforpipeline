import * as fs from 'fs';
import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import { Aerospike } from '../../aerospike'

export class HomeController {
    constructor() { }

    /**
     * @method BOOTSTRAP
     * @description : Post bulk menu data
     * */
    async bootstrapHome() {
        try {
            await Aerospike.truncate({ set: ENTITY.HomeE.set, before_nanos: 0 })
            let rawdata = fs.readFileSync(__dirname + '/../../../model/home.json', 'utf-8');
            let home = JSON.parse(rawdata);
            for (const iterator of home) {
                ENTITY.HomeE.postHome(iterator)
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "bootstrapHome", error, false)
            return Promise.reject(error)
        }
    }

    /**
    * @method GET
    * */
    async fetchHome(headers: ICommonRequest.IHeaders) {
        try {
            return [
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
            // await ENTITY.HomeE.getHome({ language: headers.language })
        } catch (error) {
            consolelog(process.cwd(), "fetchHome", error, false)
            return Promise.reject(error)
        }
    }

    /**
    * @method GRPC
    * @param {string} data  actuall array of menu or upsell
    * */
    async syncFromKafka(payload: IKafkaGrpcRequest.IKafkaBody) {
        try {
            let data = JSON.parse(payload.as.argv)
            if (payload.as.create || payload.as.update || payload.as.get) {
                if (payload.as.create) {

                }
                if (payload.as.update) {

                }
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncFromKafka", error, false)
            return Promise.reject(error)
        }
    }
}

export const homeController = new HomeController();