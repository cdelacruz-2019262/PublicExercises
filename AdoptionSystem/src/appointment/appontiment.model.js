'use strict'

import { Schema, model } from 'mongoose'

const appoimentSchema = Schema({
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['CREATED', 'ACEPTED', 'CANCELED', 'FINISHED'],
        default: 'CREATED',
        required: true
    },
    animal: {
        type: Schema.ObjectId,
        ref: 'animal',
        required: true,
    },
    user: {
        type: Schema.ObjectId,
        ref: 'user',
        required: true
    }
}, {
    versionKey: false
})

export default model('appoiment', appoimentSchema)