const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');


// Auth Routes
router.post('/signup', authController.signup);
router.post('/signin', authController.signin);


module.exports = router;
