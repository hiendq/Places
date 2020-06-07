const productServices = require('../services/product.services')

module.exports.getProductByPage = function(req, res) {
    console.log('------------------')
    const { page } = req.params;
    productServices.getProductByPage(page)
        .then(result => res.status(201).json(result))
       
}