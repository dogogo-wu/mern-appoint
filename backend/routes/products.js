const express = require("express")
const router = express.Router()
// var multer  = require('multer')
// var upload = multer({ dest: 'uploads/' })

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
router.post('/', createProduct)
// router.post('/',upload.single('img'), createProduct)
router.delete('/:id', deleteProduct)
router.patch('/:id', isAdmin, updateProduct)    // un-used


module.exports = router