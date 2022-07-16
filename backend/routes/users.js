const express  = require("express")
const router = express.Router()
const User = require('../models/userModel')

// Get all items
router.get('/', (req, res) => {
    res.json({ mssg: 'get all' })
})

// Get one item
router.get('/:id', (req, res) => {
    res.json({ mssg: 'get one' })
})

// Create one item
router.post('/', (req, res) => {
    res.json({ mssg: 'create one' })
})

// Update one item
router.patch('/:id', (req, res) => {
    res.json({ mssg: 'update one' })
})

// Delete one item
router.delete('/:id', (req, res) => {
    res.json({ mssg: 'delete one' })
})

module.exports = router