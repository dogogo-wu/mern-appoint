const mongoose = require('mongoose')
const Schema = mongoose.Schema
const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    img: {
        contentType: { type: String },
        image: { type: String }
    },
    content: {
        type: String,
    },
    location:{
        type: String,
    },
    prepare_time: {
        type: String,
    },
    longest_appoint_time: {
        type: String,
    },
    available_duration: {
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