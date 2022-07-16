const mongoose = require('mongoose')
const Schema = mongoose.Schema
const productSchema = new Schema({
    product:{
        type: Schema.Types.ObjectId,
        ref: "Product"
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

module.exports = mongoose.model('Product', productSchema)