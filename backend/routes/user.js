const express = require("express")
const router = express.Router()

const {
    signupFunc,
    loginFunc,
    initCheck
} = require('../controllers/userController')

const { isAuth } = require("../middleware/auth")

router.post('/signup', signupFunc)
router.post('/login', loginFunc)
router.post('/init', isAuth, initCheck)



module.exports = router