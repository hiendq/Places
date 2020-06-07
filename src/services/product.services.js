var Product = require('../models/product.model.js')

const getProductByPage = async (page) => {
  return await Product.find().sort({_id: -1}).limit(4).skip((page-1)*4);
};

  module.exports = {
    getProductByPage,
  };