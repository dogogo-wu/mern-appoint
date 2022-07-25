const Appoint = require('../models/appointModel')
const Product = require('../models/productModel')
const mongoose = require('mongoose')

const getMyAppoints = async (req, res) => {
    console.log(req.user.my_id);
    const appoints = await Appoint.find({ user_id: req.user.my_id }).populate('prod').sort({ createdAt: -1 })
    console.log(appoints);
    res.status(200).json(appoints)
}

// Get all items
const getAppoints = async (req, res) => {
    const appoints = await Appoint.find({}).populate('prod').sort({ createdAt: -1 })
    res.status(200).json(appoints)
}

// Get one item
const getAppoint = async (req, res) => {
    const { id } = req.params
    if (!(mongoose.Types.ObjectId.isValid(id))) {
        return res.status(404).json({ error: 'No such item' })
    }
    const appoint = await Appoint.findById(id)
    if (!appoint) {
        return res.status(404).json({ error: 'No such item' })
    }
    res.status(200).json(appoint)
}

// Create one item
const createAppoint = async (req, res) => {
    const { start, end, prod_base_id } = req.body;

    // generate my_id (start from 1)
    var my_id = 0;
    const item_cnt = await Appoint.countDocuments({});
    if (item_cnt == 0) {
        my_id = 1;
        console.log('Hello');
    } else {
        // get max id
        const tarobj = await Appoint.findOne().sort({ my_id: -1 })
        my_id = parseInt(tarobj.my_id) + 1
    }

    try {
        const appoint = await Appoint.create({
            start,
            end,
            prod: prod_base_id,
            my_id,
            // user_id: req.user.my_id
        });


        // Update product occupied_time
        const prod = await Product.findOneAndUpdate(
            { _id: prod_base_id },
            { $push: { occupied_time: { start, end } } }
        )
        if (!prod) {
            return res.status(404).json({ error: 'No such item' })
        }

        res.status(200).json(appoint);
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

// Delete one item
const deleteAppoint = async (req, res) => {
    const { id } = req.params
    if (!(mongoose.Types.ObjectId.isValid(id))) {
        return res.status(404).json({ error: 'No such item' })
    }
    const appoint = await Appoint.findOneAndDelete({ _id: id })
    if (!appoint) {
        return res.status(404).json({ error: 'No such item' })
    }
    res.status(200).json(appoint)
}

// Update one item
const updateAppoint = async (req, res) => {
    const { id } = req.params
    if (!(mongoose.Types.ObjectId.isValid(id))) {
        return res.status(404).json({ error: 'No such item' })
    }
    const appoint = await Appoint.findOneAndUpdate({ _id: id }, { ...req.body })
    if (!appoint) {
        return res.status(404).json({ error: 'No such item' })
    }
    res.status(200).json(appoint)
}

module.exports = { getAppoints, getAppoint, createAppoint, deleteAppoint, updateAppoint, getMyAppoints }