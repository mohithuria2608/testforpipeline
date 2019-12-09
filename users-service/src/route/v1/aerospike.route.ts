import * as Joi from '@hapi/joi';
import * as Router from 'koa-router'
import { Aerospike } from '../../databases/aerospike'
import { validate } from '../../middlewares'


export default (router: Router) => {
    router
        .post('/create-index',
            validate({
                body: {
                    set: Joi.string().required(),
                    bin: Joi.string().required(),
                    type: Joi.string().valid('NUMERIC', 'STRING', 'GEO2DSPHERE').required(),
                }
            }),
            async (ctx) => {
                try {
                    let payload = { ...ctx.request.body };

                    let createIndexArg: IAerospike.CreateIndex = {
                        set: payload.set,
                        bin: payload.bin,
                        index: 'idx_' + payload.set + '_' + payload.bin,
                        type: payload.type
                    }
                    await Aerospike.indexCreate(createIndexArg)
                    ctx.body = {}
                }
                catch (error) {
                    throw error
                }
            })
        .post('/register-ufd',
            async (ctx) => {
                try {
                    Aerospike.udfRegister({ module: __dirname + '/../../../lua/user.lua' })
                    ctx.body = {}
                }
                catch (error) {
                    throw error
                }
            })

        .post('/test',
            async (ctx) => {
                try {
                    const aerospike = require('aerospike');
                    const maps = aerospike.maps;
                    const GJSON = aerospike.GeoJSON
                    // Aerospike.put({
                    //     bins: {
                    //         "storeId": 82,
                    //         "menuId": 5,
                    //         "name_en": "MUSSAFAH ADNOC - ABU DHABI",
                    //         "name_ar": "كنتاكى المصفح-أدنوك  - أبو ظبى",
                    //         "phone1": "0557080691",
                    //         "phone2": "0557080695",
                    //         "services": {
                    //             "din": 1,
                    //             "del": 1,
                    //             "tak": 1
                    //         },
                    //         "active": 1,
                    //         "geoData": {
                    //             "address_en": "Mussafah Industrial Area, at the ADNOC Petrol Station M22",
                    //             "address_ar": "مصفح الصناعية داخل محطة أدنوك  إم 22",
                    //         },
                    //         "geoFence": new GJSON(
                    //             {
                    //                 type: "Polygon",
                    //                 coordinates:
                    //                     [
                    //                         [
                    //                             [
                    //                                 71.6967773,
                    //                                 32.6393749
                    //                             ],
                    //                             [
                    //                                 76.4868164,
                    //                                 34.3434361
                    //                             ],
                    //                             [
                    //                                 80.4638672,
                    //                                 32.0639556
                    //                             ],
                    //                             [
                    //                                 79.4750977,
                    //                                 28.1107488
                    //                             ],
                    //                             [
                    //                                 74.3994141,
                    //                                 26.4312281
                    //                             ],
                    //                             [
                    //                                 68.9941406,
                    //                                 28.8831596
                    //                             ],
                    //                             [
                    //                                 71.6967773,
                    //                                 32.6578757
                    //                             ]
                    //                         ]
                    //                     ]
                    //             }),
                    //         "startTime": {},
                    //         "endTime": {}
                    //     },
                    //     set: 'outlet',
                    //     key: "outlet1",
                    //     create: true
                    // })


                    // await Aerospike.operationsOnMap({ set: 'user', key: '155e0680-19b5-11ea-bf45-d91ad9310ae6' }, [])

                    ctx.body = {}
                }
                catch (error) {
                    throw error
                }
            })
}