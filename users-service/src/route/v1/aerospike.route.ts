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
                    // Aerospike.put({
                    //     bins: {
                    //         name: "ankit",
                    //         session: {
                    //             sdfghgfdsdfg: {
                    //                 "otpExpAt": 0,
                    //                 "otp": 0,
                    //             }
                    //         }

                    //     },
                    //     set: 'user',
                    //     key: "8f271e00-19b2-11ea-a8ee-afd6b5536623",
                    //     create: true
                    // })


                    await Aerospike.operationsOnMap({ set: 'user', key: '155e0680-19b5-11ea-bf45-d91ad9310ae6' }, [])

                    ctx.body = {}
                }
                catch (error) {
                    throw error
                }
            })
}