import { Aerospike } from "../databases/aerospike";
import { consolelog } from '../utils'

export class BaseEntity {
    public DAO = Aerospike;
    protected modelName: ModelNames;
    constructor(modelName?) {
        this.modelName = modelName
    }

}