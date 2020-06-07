var mongoose = require('mongoose');
const Schema = require("mongoose").Schema;
var ProductSchema = new mongoose.Schema({
    _id: {type: String ,required:true },
    id_account: { type: String ,required:true },
    title: { type: String ,required:true},
    description: String,
    status: {type:Boolean, default: false}, 
    area: Number,
    //location: { longtitude: Number, latitude: Number },
    address: String,
    price: Number,
    phone: String,
    picture:String,
    createDay: { type: Date, default: Date.now }
    
});
var Product = mongoose.model("product", ProductSchema, 'news');

module.exports= Product;