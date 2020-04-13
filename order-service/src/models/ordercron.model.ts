import { Schema, Document, model } from 'mongoose'
import * as Constant from '../constant';

export interface IOrdercron extends Document {
    
};


const ordercronSchema = new Schema({
});

export let ordercron = model<IOrdercron>('ordercron', ordercronSchema)