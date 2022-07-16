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
    pre_time: {
        type: String,
        required: true
    },
    myid: {
        type: Number,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)