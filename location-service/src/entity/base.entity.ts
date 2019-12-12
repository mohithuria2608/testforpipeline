import * as Constant from '../constant'
import { consolelog } from '../utils'
import { Aerospike } from '../databases/aerospike'

export class BaseEntity {
    protected set: SetNames;
    constructor(set?) {
        this.set = set
    }

    chunk(array, size) {
        const chunked_arr = [];
        for (let i = 0; i < array.length; i++) {
            const last = chunked_arr[chunked_arr.length - 1];
            if (!last || last.length === size) {
                chunked_arr.push([array[i]]);
            } else {
                last.push(array[i]);
            }
        }
        return chunked_arr;
    }

    async scanAerospike() {
        try {
            return await Aerospike.scan(this.set)
        } catch (error) {
            consolelog("scanAerospike", error, false)
            return Promise.reject(error)
        }
    }
}