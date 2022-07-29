const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    admin: {
        type: Boolean,
        required: true
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }],
    appoints: [{
        type: Schema.Types.ObjectId,
        ref: "Appoint"
    }],
    my_id: {
        type: Number,
        required: true
    }
}, { timestamps: true })

userSchema.statics.signup = async function (email, password, my_id, admin) {
    // Validation
    if (!email || !password) {
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    // if(!validator.isStrongPassword(password)){
    //     throw Error('Password not strong enough')
    // }
    if (!validator.isLength(password, { min: 6 })) {
        throw Error('Password must have at least 6 characters')
    }

    const exists = await this.findOne({ email })
    if (exists) {
        throw Error('Email already in use')
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash, my_id, admin })

    return user
}

userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled')
    }
    const user = await this.findOne({ email })
    if (!user) {
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)