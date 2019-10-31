import * as Services from '../databases/dao';
import { consolelog } from '../utils'

export class BaseEntity {
    public DAOManager = new Services.DAOManager();
    protected modelName: ModelNames;
    constructor(modelName?) {
        this.modelName = modelName
    }

}