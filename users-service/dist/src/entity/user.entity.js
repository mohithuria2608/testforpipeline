'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const base_entity_1 = require("./base.entity");
class UserClass extends base_entity_1.BaseEntity {
    constructor() {
        super('User');
    }
}
exports.UserClass = UserClass;
exports.UserC = new UserClass();
