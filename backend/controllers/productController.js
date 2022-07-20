const Product = require('../models/productModel')
const mongoose = require('mongoose')


// Get all items
const getProducts = async (req, res) => {
    const products = await Product.find({}).sort({ createdAt: -1 })

    // var options = {
    //     headers: {
    //         'x-timestamp': Date.now(),
    //         'x-sent': true,
    //         'name': 'MattDionis',
    //         'origin': 'stackoverflow'
    //     }
    // };
    // res.status(200).sendFile(path.join(__dirname, '../assets', 'index.html'), options);

    
    res.status(200).json(products).sendFile
}

// Get one item
const getProduct = async (req, res) => {
    const { id } = req.params
    if (!(mongoose.Types.ObjectId.isValid(id))) {
        return res.status(404).json({ error: 'No such item' })
    }
    const product = await Product.findById(id)
    if (!product) {
        return res.status(404).json({ error: 'No such item' })
    }
    res.status(200).json(product)
}

// Create one item
const createProduct = async (req, res) => {

    const img_path = req.file.path
    const { title, content } = req.body;
    console.log(img_path);

    // Generate my_id (start from 1)
    var my_id = 0;
    const item_cnt = await Product.count({});
    if (item_cnt == 0) {
        my_id = 1;
    } else {
        const tarobj = await Product.findOne().sort({ my_id: -1 })
        my_id = parseInt(tarobj.my_id) + 1
    }

    // Store product
    try {
        const product = await Product.create({
            title,
            img: img_path,
            content,
            my_id,
            user_id: req.user.my_id
        });
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

// Delete one item
const deleteProduct = async (req, res) => {
    const { id } = req.params
    if (!(mongoose.Types.ObjectId.isValid(id))) {
        return res.status(404).json({ error: 'No such item' })
    }
    const product = await Product.findOneAndDelete({ _id: id })
    if (!product) {
        return res.status(404).json({ error: 'No such item' })
    }
    res.status(200).json(product)
}

// Update one item
const updateProduct = async (req, res) => {
    const { id } = req.params
    if (!(mongoose.Types.ObjectId.isValid(id))) {
        return res.status(404).json({ error: 'No such item' })
    }
    const product = await Product.findOneAndUpdate({ _id: id }, { ...req.body })
    if (!product) {
        return res.status(404).json({ error: 'No such item' })
    }
    res.status(200).json(product)
}

module.exports = { getProducts, getProduct, createProduct, deleteProduct, updateProduct }