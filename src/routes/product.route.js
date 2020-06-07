var express = require('express');
var controllers = require('../controllers/product.controller')
var router = express.Router();


router.get('/:page', controllers.getProductByPage);


module.exports = router;