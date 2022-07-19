const mongoose = require('mongoose')
const Schema = mongoose.Schema
const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    describe:{
        type: String,
    },
    occupied_time: [{
        start: { type: String },
        end: { type: String }
    }],
    prepare_time: {
        type: String,
    },
    longest_appoint_time: {
        type: String,
    },
    available_duration:{
        start: { type: String },
        end: { type: String }
    },
    user_id: {
        type: Number,
    },
    my_id: {
        type: Number,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)