const User = require('../models/userModel')
const mongoose = require('mongoose')
const passport = require("passport");

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
    const { username, password } = req.body;

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
    // admin: (power == 1) , user: (power == 2)
    const power = 2;

    User.register({username, power, my_id}, password, function(err, user){
        if(err){
            res.status(400).json({ error: err.message })
        }else{
            passport.authenticate('local')(req, res, function(){
                res.status(200).json(user);
            });
        }
    });
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

const loginFunc = (req, res)=>{

    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, function(err){
        if(err){
            res.status(400).json({ error: err.message })
        }else{
            passport.authenticate('local')(req, res, function(){
                res.status(200).json({mssg: "Login!"})
            });
        }
    });
}

const logoutFunc = (req, res)=>{
    req.logout(err=>{
        if(err){
            res.status(400).json({ error: err.message })
        }else{
            res.status(200).json({mssg: "Logout!"})
        }
    });
}

module.exports = { getUsers, getUser, createUser, deleteUser, updateUser, loginFunc, logoutFunc }