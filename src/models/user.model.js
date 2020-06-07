var mongoose = require('mongoose');
const Schema = require("mongoose").Schema;
var userSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    address: String,
    phone: String
});
var User = mongoose.model("user", userSchema, 'account');

module.exports= User;