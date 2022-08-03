const Product = require('../models/productModel')
const mongoose = require('mongoose')
const fs = require('fs');
const {Base64} = require('js-base64');

// Get all items
const getProducts = async (req, res) => {
    const products = await Product.find({}).sort({ createdAt: -1 })

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

    const { title, content, location } = req.body;
    var img = fs.readFileSync(req.file.path);

    var finalImg = {
        contentType: req.file.mimetype,
        image:  Base64.encode(img)
    };

    // Delete upload file on server
    try {
        fs.unlinkSync(req.file.path);
        // console.log("File on Server is removed.");
    } catch (error) {
        console.log(error);
    }

    // Generate my_id (start from 1)
    var my_id = 0;
    const item_cnt = await Product.countDocuments({});
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
            img:finalImg,
            content,
            location,
            my_id,
            user_id: 0
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