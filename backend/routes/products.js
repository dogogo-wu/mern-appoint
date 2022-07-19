const express = require("express")
const router = express.Router()
const {
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct
} = require('../controllers/productController')
const auth = require("../middleware/auth")


router.get('/', auth, getProducts)
router.get('/:id', auth, getProduct)     // un-used
router.post('/', auth, createProduct)
router.delete('/:id', auth, deleteProduct)
router.patch('/:id', auth, updateProduct)    // un-used


module.exports = router