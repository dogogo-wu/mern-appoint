const mongoose = require('mongoose')
const Schema = mongoose.Schema
const appointSchema = new Schema({
    appoint:{
        type: Schema.Types.ObjectId,
        ref: "Appoint"
    },
    time_start: {
        type: String,
        required: true
    },
    time_end: {
        type: String,
        required: true
    },
    status:{
        type: Number,
        required: true
    },
    userid:{
        type: Number,
        required: true
    },
    myid: {
        type: Number,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Appoint', appointSchema)