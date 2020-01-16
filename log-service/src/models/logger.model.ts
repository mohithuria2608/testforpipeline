import { Schema, Document, model } from 'mongoose'
import * as Constant from '../constant';

export interface ILogger extends Document {

};

const loggerSchema = new Schema({

});

export let Logger = model<ILogger>('logger', loggerSchema)
