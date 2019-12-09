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
                    // [20, 20],
                    // [20, 30],
                    // [30, 30],
                    // [30, 0],
                    // [20, 20]
                    const aerospike = require('aerospike');
                    // Aerospike.secondaryIndexForGeoQuery()
                    let GeoJSON = aerospike.GeoJSON;
                    let polygon = new GeoJSON({
                        type: 'Polygon',
                        coordinates:
                            [
                                [
                                    [
                                        71.6967773,
                                        32.6393749
                                    ],
                                    [
                                        76.4868164,
                                        34.3434361
                                    ],
                                    [
                                        80.4638672,
                                        32.0639556
                                    ],
                                    [
                                        79.4750977,
                                        28.1107488
                                    ],
                                    [
                                        74.3994141,
                                        26.4312281
                                    ],
                                    [
                                        68.9941406,
                                        28.8831596
                                    ],
                                    [
                                        71.6967773,
                                        32.6578757
                                    ]
                                ]
                            ]
                    })
                    Aerospike.put({
                        bins: {
                            "storeId": 82,
                            "menuId": 5,
                            "geoFence": polygon
                        },
                        set: 'outlet',
                        key: "outlet1",
                        update: true
                    })

                    // await Aerospike.operationsOnMap({ set: 'user', key: '155e0680-19b5-11ea-bf45-d91ad9310ae6' }, [])

                    ctx.body = {}
                }
                catch (error) {
                    throw error
                }
            })
}


