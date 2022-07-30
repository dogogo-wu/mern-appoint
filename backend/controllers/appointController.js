const Appoint = require('../models/appointModel')
const Product = require('../models/productModel')
const User = require('../models/userModel')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer');

const getMyAppoints = async (req, res) => {
    const appoints = await Appoint.find({ user_id: req.user.my_id }).populate('prod').sort({ createdAt: -1 })
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
    } else {
        // get max id
        const tarobj = await Appoint.findOne().sort({ my_id: -1 })
        my_id = parseInt(tarobj.my_id) + 1
    }

    const status = 0;

    try {
        const appoint = await Appoint.create({
            start,
            end,
            prod: prod_base_id,
            my_id,
            user_id: req.user.my_id,
            status
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
    const appoint = await Appoint.findOneAndUpdate({ _id: id }, { ...req.body }).populate({ path: 'prod', select: 'title content img' })
    if (!appoint) {
        return res.status(404).json({ error: 'No such item' })
    }
    // Send Email
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    const taruser = await User.findOne({ my_id: appoint.user_id })

    const getStatus = (status) => {
        if (status === 1) {
            return "已核可"
        } else if (status === 2) {
            return "已駁回"
        }
    }
    const out_title = `您預約的-${appoint.prod.title}「${getStatus(req.body.status)}」`
    const out_content = `<h3>感謝您使用本系統</h3><p>訊息：${req.body.message}</p>`

    transporter.sendMail({
        from: process.env.MAIL_USERNAME,
        to: taruser.email,
        subject: out_title,
        html: out_content,
        attachments: [{
            filename: 'image.'+appoint.prod.img.contentType.split('/')[1],
            content: appoint.prod.img.image,
            encoding: 'base64'
        }]
    }).then(info => {
        // console.log({ info });
    }).catch(console.error);

    res.status(200).json(appoint)


}

module.exports = { getAppoints, getAppoint, createAppoint, deleteAppoint, updateAppoint, getMyAppoints }