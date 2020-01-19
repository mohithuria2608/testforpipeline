import { Schema, Document, model } from 'mongoose'
import * as Constant from '../constant';

export interface Ilogger extends Document {

};

const loggerSchema = new Schema({

});

export let logger = model<Ilogger>('logger', loggerSchema)
