const Product = require('../models/productModel')
const mongoose = require('mongoose')

// Get all items
const getProducts = async (req, res) => {
    const products = await Product.find({}).sort({ createdAt: -1 })
    res.status(200).json(products)
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
    const { name, img, pre_time } = req.body;

    // generate myid (start from 1)
    var myid = 0;
    const item_cnt = await Product.count({});
    if (item_cnt == 0) {
        myid = 1;
    } else {
        // get max id
        const tarobj = await Product.findOne().sort({myid: -1})
        myid = parseInt(tarobj.myid) + 1
    }

    try {
        const product = await Product.create({
            name, img, pre_time, myid
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