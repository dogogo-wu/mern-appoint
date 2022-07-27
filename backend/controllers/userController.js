const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const maxAge = 3 * 24 * 60 * 60
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: maxAge })
}

// Create one item
const signupFunc = async (req, res) => {
    const { email, password } = req.body;

    // generate my_id (start from 1)
    var my_id = 0;
    const item_cnt = await User.countDocuments({});
    if (item_cnt == 0) {
        my_id = 1;
    } else {
        // get max id
        const tarobj = await User.findOne().sort({ my_id: -1 })
        my_id = parseInt(tarobj.my_id) + 1
    }
    // admin power=1, user power=0
    const power = 1;

    try {
        const user = await User.signup(email, password, my_id, power)
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000})
        res.status(200).json({ email, token })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }

}

const loginFunc = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000})
        res.status(200).json({ email, token })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }

}

const logoutFunc = (req, res) => {

}

module.exports = { signupFunc, loginFunc, logoutFunc }