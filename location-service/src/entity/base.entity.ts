import { consolelog } from '../utils'
import { Aerospike } from '../aerospike'

export class BaseEntity {
    public set: SetNames;
    constructor(set?) {
        this.set = set
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