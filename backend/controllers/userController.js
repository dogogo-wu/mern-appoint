const User = require('../models/userModel')
const mongoose = require('mongoose')

// Get all items
const getUsers = async (req, res) => {
    const users = await User.find({}).sort({ createdAt: -1 })
    res.status(200).json(users)
}

// Get one item
const getUser = async (req, res) => {
    const { id } = req.params
    if (!(mongoose.Types.ObjectId.isValid(id))) {
        return res.status(404).json({ error: 'No such item' })
    }
    const user = await User.findById(id)
    if (!user) {
        return res.status(404).json({ error: 'No such item' })
    }
    res.status(200).json(user)
}

// Create one item
const createUser = async (req, res) => {
    const { name, email, password, power } = req.body;

    // generate my_id (start from 1)
    var my_id = 0;
    const item_cnt = await User.count({});
    if (item_cnt == 0) {
        my_id = 1;
    } else {
        // get max id
        const tarobj = await User.findOne().sort({ my_id: -1 })
        my_id = parseInt(tarobj.my_id) + 1
    }

    try {
        const user = await User.create({
            name, email, password, power, my_id
        });
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

// Delete one item
const deleteUser = async (req, res) => {
    const { id } = req.params
    if (!(mongoose.Types.ObjectId.isValid(id))) {
        return res.status(404).json({ error: 'No such item' })
    }
    const user = await User.findOneAndDelete({ _id: id })
    if (!user) {
        return res.status(404).json({ error: 'No such item' })
    }
    res.status(200).json(user)
}

// Update one item
const updateUser = async (req, res) => {
    const { id } = req.params
    if (!(mongoose.Types.ObjectId.isValid(id))) {
        return res.status(404).json({ error: 'No such item' })
    }
    const user = await User.findOneAndUpdate({ _id: id }, { ...req.body })
    if (!user) {
        return res.status(404).json({ error: 'No such item' })
    }
    res.status(200).json(user)
}

module.exports = { getUsers, getUser, createUser, deleteUser, updateUser }