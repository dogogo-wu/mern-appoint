const express = require("express")
const router = express.Router()

const {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser,
    loginFunc,
    logoutFunc
} = require('../controllers/userController')
const auth = require('../middleware/auth')


router.get('/', getUsers)   // un-used
router.get('/:id', getUser)     // un-used
router.post('/', createUser)    // register
router.delete('/:id', deleteUser)   // un-used
router.patch('/:id', updateUser)    // un-used

router.post('/login', loginFunc)
router.post('/logout', auth, logoutFunc)

module.exports = router