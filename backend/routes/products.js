const express = require("express")
const router = express.Router()
const {
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct
} = require('../controllers/productController')
const {auth, isAdmin} = require("../middleware/auth")


router.get('/', getProducts)
router.get('/:id', auth, getProduct)     // un-used
router.post('/', isAdmin, createProduct)
router.delete('/:id', isAdmin, deleteProduct)
router.patch('/:id', isAdmin, updateProduct)    // un-used


module.exports = router