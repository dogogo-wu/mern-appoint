const express  = require("express")
const router = express.Router()

const {auth, isAdmin} = require('../middleware/auth')

const {
    getAppoints, 
    getAppoint, 
    createAppoint, 
    deleteAppoint, 
    updateAppoint,
    getMyAppoints
} = require('../controllers/appointController')


router.get('/',isAdmin, getAppoints)
router.get('/:id',isAdmin, getAppoint)
router.post('/',auth, createAppoint)
router.delete('/:id',isAdmin, deleteAppoint)    
router.patch('/:id',isAdmin, updateAppoint)

router.get('/my',auth, getMyAppoints)


module.exports = router