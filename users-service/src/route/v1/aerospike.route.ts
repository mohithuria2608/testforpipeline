import * as Router from 'koa-router'
import { Aerospike } from '../../databases/aerospike'


export default (router: Router) => {
    router
        .post('/create-index',
            async (ctx) => {
                try {
                    let createIndexArg: IAerospike.CreateIndex = {
                        set: 'user',
                        bin: 'phnNo',
                        index: 'idx_user_phnNo',
                        type: 'STRING'
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
}