const User = require('../models/userModel')
const mongoose = require('mongoose')
const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
//     User.findOne({id: jwt_payload.sub}, function(err, user) {
//         if (err) {
//             return done(err, false);
//         }
//         if (user) {
//             return done(null, user);
//         } else {
//             return done(null, false);
//             // or you could create a new account
//         }
//     });
// }));

// passport.use(new GoogleStrategy({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/auth/google/secrets"
// },
//     function (accessToken, refreshToken, profile, cb) {
//         // console.log(profile);
//         User.findOrCreate({ googleId: profile.id }, function (err, user) {
//             return cb(err, user);
//         });
//     }
// ));


// Create one item
const signupFunc = async (req, res) => {
    const { username, password } = req.body;

    // generate my_id (start from 1)
    var my_id = 0;
    const item_cnt = await User.countDocuments({});
    if (item_cnt == 0) {
        my_id = 1;
    } else {
        // get max id
        const tarobj = await User.findOne().sort({ my_id: -1 })
        my_id = parseInt(tarobj.my_id) + 1
    }
    // admin: (power == 1) , user: (power == 2)
    const power = 2;

    User.register({ username, power, my_id }, password, function (err, user) {
        if (err) {
            res.status(400).json({ error: err.message })
        } else {
            passport.authenticate('local')(req, res, function () {
                res.status(200).json(user);
            });
        }
    });
}

const loginFunc = (req, res) => {

    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    req.login(user, function (err) {
        if (err) {
            res.status(400).json({ error: err.message })
        } else {
            passport.authenticate('local')(req, res, function () {
                res.status(200).json({ mssg: "Login!" })
            });
        }
    });
}

const logoutFunc = (req, res) => {
    req.logout(err => {
        if (err) {
            res.status(400).json({ error: err.message })
        } else {
            res.status(200).json({ mssg: "Logout!" })
        }
    });
}

module.exports = { signupFunc, loginFunc, logoutFunc }