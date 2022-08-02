const express = require("express")
const router = express.Router()
var multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const {
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct
} = require('../controllers/productController')
const { isAuth, isAdmin } = require("../middleware/auth")


router.get('/', getProducts)
router.get('/:id', getProduct)
router.post('/', isAdmin, upload.single('img'), createProduct)    // multer
router.delete('/:id',isAdmin, deleteProduct)
router.patch('/:id', isAdmin, updateProduct)    // un-used


module.exports = router