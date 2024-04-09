const express = require('express');
const router = express.Router();
const employeeController = require('../controller/employee.controller');


// Employee Routes
router.post('/get-employee-data', employeeController.getEmployeeWorkingData);
router.post('/update-employee-data', employeeController.updateEmployeeWorkingData);


module.exports = router;
