var express = require('express');
var controllers = require('../controllers/auth.controller')
var router = express.Router();


router.post('/signup', controllers.logUp);

router.post('/login', controllers.logIn);

router.post('/checkLogin', controllers.checkLogin);

router.post('/changePassword', controllers.changePass);

router.post('/changeInfo', controllers.changeInfo);

module.exports = router;