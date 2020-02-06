import * as Constant from '../constant'
import { consolelog } from '../utils'
import { Aerospike } from '../aerospike'

export class BaseEntity {
    public set: SetNames;
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

    async scanAerospike(bins?: string[]) {
        try {
            const argv: IAerospike.Scan = {
                set: this.set,
                bins: bins
            }
            return await Aerospike.scan(argv)
        } catch (error) {
            consolelog(process.cwd(), "scanAerospike", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}