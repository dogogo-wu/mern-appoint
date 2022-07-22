const express = require("express")
const router = express.Router()

const {
    signupFunc,
    loginFunc,
    logoutFunc
} = require('../controllers/userController')
const {auth, isAdmin} = require('../middleware/auth')

router.post('/signup', signupFunc)

router.post('/login', loginFunc)
router.post('/logout', auth, logoutFunc)

module.exports = router