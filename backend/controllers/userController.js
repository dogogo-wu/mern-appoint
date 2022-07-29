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

    const admin = false;

    try {
        const user = await User.signup(email, password, my_id, admin)
        const token = createToken(user._id)
        res.status(200).json({ email, token, admin})
    } catch (err) {
        res.status(400).json({ error: err.message })
    }

}

const loginFunc = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.status(200).json({ email, token, admin: user.admin })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }

}

module.exports = { signupFunc, loginFunc }