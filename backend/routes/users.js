const express  = require("express")
const router = express.Router()

const {
    getUsers, 
    getUser, 
    createUser, 
    deleteUser, 
    updateUser ,
    loginFunc,
    logoutFunc
} = require('../controllers/userController')


router.get('/', getUsers)
router.get('/:id', getUser)
router.post('/', createUser)
router.delete('/:id', deleteUser)
router.patch('/:id', updateUser)

router.post('/login', loginFunc)
router.post('/logout', logoutFunc)

module.exports = router