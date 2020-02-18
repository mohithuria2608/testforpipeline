import * as Joi from '@hapi/joi';
import * as Router from 'koa-router'
import { Aerospike } from '../../aerospike'
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
        .post('/test',
            async (ctx) => {
                ctx.body = {}
                try {
                    
                    // Aerospike.put({
                    //     bins: {
                    //         "id": "cd4444c0-1c31-11ea-964e-c13f240dc3c5",
                    //         "storeId": 28,
                    //         "countryId": -1,
                    //         "provinceId": 7,
                    //         "menuId": 5,
                    //         "areaId": 520,
                    //         "streetId": 4,
                    //         "districtId": 1010,
                    //         "mapId": 349,
                    //         "name_en": "ABU KADRA - DUBAI",
                    //         "name_ar": "كنتاكى أبو خضرة  - دبى",
                    //         "phone1": "0551484072",
                    //         "phone2": "0551484079",
                    //         "services": {
                    //             "del": 0,
                    //             "tak": 0,
                    //             "din": 0
                    //         },
                    //         "active": 1,
                    //         "location": {
                    //             "description": "Dubai - Al Ain Rd - Dubai - United Arab Emirates",
                    //             "latitude": 25.1922898422229,
                    //             "longitude": 55.3089012183914
                    //         },
                    //         "address_en": "Dubai Al Ain Road, at the Emarat Petrol Station",
                    //         "address_ar": "طريق دبي العين ، داخل محطة بنزين إمارات",
                    //         "geoFence": polygon,
                    //         "startTime": "2014-08-03T04:30:00.000Z",
                    //         "endTime": "2014-08-02T21:30:59.000Z"
                    //     },
                    //     set: 'store',
                    //     key: "ef801b00-1abe-11ea-8153-7526aef7d0f7",
                    //     create: true
                    // })

                    // let res = await Aerospike.query({
                    //     set: "store",
                    //     geoWithin: {
                    //         bin: "geoFence",
                    //         lat: 55.329423,
                    //         lng: 25.2196954
                    //     }
                    // })
                    // AGGREGATE address.get_address() ON americana.address WHERE location='MA'
                    // SELECT * FROM americana.store WHERE geoFence CONTAINS GeoJSON('{"type":"Point", "coordinates": [77.3651218, 28.5911163]}')
                    // await Aerospike.operationsOnMap({ set: 'user', key: '155e0680-19b5-11ea-bf45-d91ad9310ae6' }, [])

                    // AGGREGATE address.orderby(1,"createdAt") ON americana.address WHERE userId='2ad59710-2bb4-11ea-9373-cd68a8a900ff'

                    // AGGREGATE menu.get_menu('En') ON americana.menu WHERE menuId='5'

                    // AGGREGATE upsell.get_upsell('En') ON americana.upsell WHERE menuId='5'
                    ctx.body = {}
                }
                catch (error) {
                    throw error
                }
            })
}






/**
 * @description : import data
 */
// 54.5488625764847,24.4138546301924
// 54.53792989254,24.4107185805549
// 54.5386701822281,24.40855944814
// 54.5356929302216,24.4044511326898
// 54.5429241657257,24.4002010105368
// 54.5525479316711,24.4029171970516
// 54.5506703853607,24.4085154835218
// 54.5505550503731,24.4085570056617
// 54.5504826307297,24.4085887578771
// 54.550359249115,24.4086498198073
// 54.5503056049347,24.4087059967571
// 54.5502626895905,24.4087963683194
// 54.5502385497093,24.4089282618349
// 54.5502653717995,24.4090186332382
// 54.5503351092339,24.4091431991205
// 54.5503780245781,24.4092897470599
// 54.550353884697,24.4094362948293
// 54.5498469471931,24.4109213026297
// 54.5488947629929,24.4137667046286
// 54.5488625764847,24.4138546301924
