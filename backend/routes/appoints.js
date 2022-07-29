const express  = require("express")
const router = express.Router()

const {isAuth, isAdmin} = require('../middleware/auth')

const {
    getAppoints, 
    getAppoint, 
    createAppoint, 
    deleteAppoint, 
    updateAppoint,
    getMyAppoints
} = require('../controllers/appointController')


router.get('/',isAuth, getAppoints)
router.get('/:id', getAppoint)
router.post('/',isAuth, createAppoint)
router.delete('/:id',isAdmin, deleteAppoint)    
router.patch('/:id',isAdmin, updateAppoint)

router.get('/my',isAuth, getMyAppoints)


module.exports = router