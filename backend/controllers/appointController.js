const Appoint = require('../models/appointModel')
const Product = require('../models/productModel')
const User = require('../models/userModel')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer');
const moment = require('moment')

const getMyAppoints = async (req, res) => {
    try {
        const appoints = await Appoint.find({ user_id: req.user.my_id }).sort({ createdAt: -1 })
        res.status(200).json(appoints)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

// Get all items
const getAppoints = async (req, res) => {
    const appoints = await Appoint.find({}).sort({ createdAt: -1 })
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
    const { prod_base_id, start, end, duration } = req.body;

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
            duration,
            prod: prod_base_id,
            my_id,
            user_id: req.user.my_id,
            status
        });

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
    const appoint = await Appoint.findOneAndUpdate({ _id: id }, { ...req.body }).populate({ path: 'prod', select: 'title content location img' })
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
    const myDateTime = (isoStr) => {
        const d = new Date(isoStr);
        var datetime = moment(d).format();
        datetime = datetime.substring(0, datetime.length - 9);
        return datetime;
      };

    const out_title = `您預約的-${appoint.prod.title}「${getStatus(req.body.status)}」`
    var out_content =
    `
    <h3>感謝您使用本系統</h3>
    <p>預約項目：${appoint.prod.title}</p>
    <p>項目描述：${appoint.prod.content}</p>
    <p>地點：${appoint.prod.location}</p>
    <p>開始時間：${myDateTime(appoint.start).split("T")[0]} ${myDateTime(appoint.start).split("T")[1]}</p>
    <p>結束時間：${myDateTime(appoint.end).split("T")[0]} ${myDateTime(appoint.end).split("T")[1]}</p>
    <p>總計時長：${appoint.duration}</p>
    <p>審核結果：${getStatus(req.body.status)}</p>
    <p>審核訊息：${req.body.message}</p>
    `
    if (req.body.status === 1 ) {
        out_content += '<h3><b>請準時前來，謝謝您！</b></h3>'
    }else if (req.body.status === 2 ){
        out_content += '<h3><b>若有疑問，請回復此信箱，謝謝您~</b></h3>'
    }


    transporter.sendMail({
        from: process.env.MAIL_USERNAME,
        to: taruser.email,
        subject: out_title,
        html: out_content,
        attachments: [{
            filename: 'image.' + appoint.prod.img.contentType.split('/')[1],
            content: appoint.prod.img.image,
            encoding: 'base64'
        }]
    }).then(info => {
        // console.log({ info });
    }).catch(console.error);

    res.status(200).json(appoint)


}

module.exports = { getAppoints, getAppoint, createAppoint, deleteAppoint, updateAppoint, getMyAppoints }