const mongoose = require('mongoose')
const Schema = mongoose.Schema
const appointSchema = new Schema({
    time_start: {
        type: String,
        required: true
    },
    time_end: {
        type: String,
        required: true
    },
    status:{
        type: Number
    },
    prod_id:{
        type: Number,
        required: true
    },
    user_id:{
        type: Number,
        // required: true
    },
    my_id: {
        type: Number,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Appoint', appointSchema)