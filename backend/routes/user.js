const express = require("express")
const router = express.Router()

const {
    signupFunc,
    loginFunc
} = require('../controllers/userController')

router.post('/signup', signupFunc)
router.post('/login', loginFunc)

module.exports = router