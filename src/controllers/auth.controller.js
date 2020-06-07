var User = require('../models/user.model')
const shortid = require('shortid');
var jwt = require('jsonwebtoken');
var passportJWT = require('passport-jwt');

var {changePassword, changeInfo} = require('../services/auth.services');

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'wowwow';

module.exports.logUp = function(req, res) {
    req.body.id = shortid.generate()
    console.log(req.body)
    User.create(req.body)
        .then(res.status(201).json({message: 'Done'}))
       
}
module.exports.checkLogin = function(req, res) {

    console.log("Checking ")
    const { token } = req.body;
    jwt.verify(token, jwtOptions.secretOrKey, function(err, decoded){
        if(decoded) {
            console.log("SUCCESS")
            User.findOne({email: decoded.email}).exec(function (err, user){
                console.log(user)
                res.status(201).json({user});
            })
        }else {
            console.log("ERROR")
            res.status(401).json({ msg: 'Please for login' })
        }
    })
}

module.exports.logIn = function(req, res) {

    const { email, password } = req.body;
    console.log(email)

    if(email && password){
        User.find({email: email }).exec(function (err, user){
            if(user.length === 0) res.status(401).json({ msg: 'No such user found'});
            else {
                if(user[0].password=== password) {
                    let payload = { id:user[0].id, name: user[0].name, email: user[0].email };
                    let token = jwt.sign(payload, jwtOptions.secretOrKey);
                    res.json({ msg: 'ok', token: token });
                }else {
                    res.status(401).json({ msg: 'Password is incorrect' })
                }
            }
        }) 
    }  
}



module.exports.changePass = async function(req, res) {

    console.log('checkLogin-------------------')
    const { token, password , newPass} = req.body;

    jwt.verify(token, jwtOptions.secretOrKey, function(err, decoded){
        if(decoded) {
            console.log("SUCCESS")
            User.find({email: decoded.email }).exec(function (err, user){
                console.log(user)
                if(user[0].password === password){
                    try {
                        const result =  changePassword(user[0]._id, newPass);
                        res.status(201).json({ msg: 'Success' })
                    }catch (error){
                        console.log(error)
                    }
                }else{
                    res.status(401).json({ msg:  'Please check password again' })
                }

            })
        }else {
            console.log("ERROR")
            res.status(401).json({ msg: 'Please for login' })
        }
    })
} 

module.exports.changeInfo = async function(req, res) {

    console.log('checkLogin-------------------')
    const { token, name , phone, address} = req.body;
    console.log(req.body)
    jwt.verify(token, jwtOptions.secretOrKey, function(err, decoded){
        if(decoded) {
            console.log("SUCCESS")
            User.find({email: decoded.email }).exec(function (err, user){
                
                try {
                    changeInfo(user[0]._id, name, phone, address)
                        .then(()=>{
                            console.log('-----------------------')
                            User.findOne({email: user[0].email}).exec(function (err, user){
                                console.log(user)
                                let payload = { id:user._id, name: user.name, email: user.email };
                                let token = jwt.sign(payload, jwtOptions.secretOrKey);
                                res.status(201).json({msg: 'Success', user, token});
                            })
                        })
                } catch (error) {
                    
                }

            })

        }else {
            console.log("ERROR")
            res.status(401).json({ msg: 'Please for login' })
        }
    })
} 
