const mongoose = require('mongoose')
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema
const userSchema = new Schema({
    username: {
        type:String,
    },
    password: {
        type:String,
    },
    power: {
        type: Number,
        required: true
    },
    products:[{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }],
    appoints:[{
        type: Schema.Types.ObjectId,
        ref: "Appoint"
    }],
    my_id:{
        type: Number,
        required: true
    }
},{timestamps: true})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema)