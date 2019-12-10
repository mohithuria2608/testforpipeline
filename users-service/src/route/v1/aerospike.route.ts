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
                    let GeoJSON = aerospike.GeoJSON;
                    // let polygon = new GeoJSON({
                    //     type: 'Polygon',
                    //     coordinates:
                    //         [
                    //             [
                    //                 [
                    //                     77.3622036,
                    //                     28.6110106
                    //                 ],
                    //                 [
                    //                     77.3555946,
                    //                     28.607017
                    //                 ],
                    //                 [
                    //                     77.3600149,
                    //                     28.6016291
                    //                 ],
                    //                 [
                    //                     77.3659801,
                    //                     28.6040782
                    //                 ],
                    //                 [
                    //                     77.367568,
                    //                     28.608411
                    //                 ],
                    //                 [
                    //                     77.3622036,
                    //                     28.6110106
                    //                 ],
                    //             ],
                    //             [
                    //                 [
                    //                     77.365036,
                    //                     28.5952236
                    //                 ],
                    //                 [
                    //                     77.3585558,
                    //                     28.5915308
                    //                 ],
                    //                 [
                    //                     77.3596287,
                    //                     28.5850116
                    //                 ],
                    //                 [
                    //                     77.3705292,
                    //                     28.5870465
                    //                 ],
                    //                 [
                    //                     77.3720312,
                    //                     28.5934902
                    //                 ],
                    //                 [
                    //                     77.365036,
                    //                     28.5952236
                    //                 ]
                    //             ]
                    //         ]
                    // })
                    // Aerospike.put({
                    //     bins: {
                    //         "storeId": 82,
                    //         "menuId": 5,
                    //         "geoFence": polygon,
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
                    //             "coords": {
                    //                 "type": "Point",
                    //                 "coordinates": []
                    //             }
                    //         },
                    //         "startTime": {},
                    //         "endTime": {},
                    //         "id": "ef801b00-1abe-11ea-8153-7526aef7d0f7"
                    //     },
                    //     set: 'store',
                    //     key: "ef801b00-1abe-11ea-8153-7526aef7d0f7",
                    //     create: true
                    // })

                    let pointA = new GeoJSON({ "type": "Point", "coordinates": [77.3651218, 28.5911163] })

                    let pointB = GeoJSON.Point(
                        77.3618603,
                        28.6062069
                    )

                    let pointC = GeoJSON.Point(
                        77.3827171,
                        28.6186583
                    ) //dontcome

                    let res = await Aerospike.geoWithin({
                        set: "store",
                        key: "geoFence",
                        lat:77.3651218,
                        lng:28.5911163
                        // point: pointA
                    })
                    // SELECT * FROM americana.store WHERE geoFence CONTAINS GeoJSON('{"type":"Point", "coordinates": [77.3651218, 28.5911163]}')
                    console.log(res)
                    // await Aerospike.operationsOnMap({ set: 'user', key: '155e0680-19b5-11ea-bf45-d91ad9310ae6' }, [])

                    ctx.body = {}
                }
                catch (error) {
                    throw error
                }
            })
}


