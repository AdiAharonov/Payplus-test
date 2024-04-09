const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const authRouter = require("./auth.route")
const employeeRouter = require("./employee.route")

// Auth Middleware
// router.use(authMiddleware);


// All Routes
router.use('/auth', authRouter);
router.use('/data', employeeRouter);


module.exports = router;
