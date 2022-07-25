const mongoose = require('mongoose')
const Schema = mongoose.Schema
const appointSchema = new Schema({
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    status:{
        type: Number
    },
    prod:{
        type: Schema.Types.ObjectId, ref: 'Product'
    },
    user_id:{
        type: Number
    },
    my_id: {
        type: Number,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Appoint', appointSchema)