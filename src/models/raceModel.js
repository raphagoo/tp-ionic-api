import mongoose from 'mongoose';
import { default as autopopulate } from "mongoose-autopopulate";

const Schema = mongoose.Schema;

export const RaceSchema = new Schema({
    name: {
        type: String,
        required: 'name required'
    },
    distance: {
        type: Number,
    },
    time: {
        type: Number
    },
    date: {
        type: Date,
    },
    startPosLat: {
        type: Number,
        required: 'Start position lattitude required'
    },
    startPosLong: {
        type: Number,
        required: 'Start position longitude required'
    },
    endPosLat: {
        type: Number
    },
    endPosLong: {
        type: Number
    },
    inProgress: {
        type: Boolean,
    }
});
RaceSchema.plugin(autopopulate);
