const express  = require("express")
const router = express.Router()
const {
    getAppoints, 
    getAppoint, 
    createAppoint, 
    deleteAppoint, 
    updateAppoint 
} = require('../controllers/appointController')


router.get('/', getAppoints)
router.get('/:id', getAppoint)
router.post('/', createAppoint)
router.delete('/:id', deleteAppoint)
router.patch('/:id', updateAppoint)


module.exports = router