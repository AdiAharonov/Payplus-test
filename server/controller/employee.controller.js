const Employee = require("../model/employee.model");

const getEmployeeWorkingData = async (req, res, next) => {
  const { employeeId } = req.body;

  try {
    // Attempt to find the employee document
    const employeeData = await Employee.findOne({ employeeId });

    if (!employeeData) {
      // Immediately return to stop function execution after sending the response
      return res.status(404).send({ message: "Employee not found" });
    }

    res.send(employeeData);
  } catch (error) {
    // If there's an error, pass it to the error handling middleware
    next(error);
  }
};

const updateEmployeeWorkingData = async (req, res, next) => {
  const { employeeId, update } = req.body;

  try {
    // Attempt to find the employee document
    const employeeData = await Employee.findOne({ employeeId: employeeId }); // Find a document with this employeeId

    // If no document is found, send a 404 response
    if (!employeeData) {
      return res.sendStatus(404);
    }

    // Check if there already has a day object for the given date
    const currentDayIndex = employeeData.workingDays.findIndex(
      (day) => day.date === update.date
    );

    // If not, create new
    if (currentDayIndex === -1) {
      employeeData.workingDays.push(update);
    } else {
      // If there is, update the existing day object with the new data
      employeeData.workingDays[currentDayIndex] = {
        ...employeeData.workingDays[currentDayIndex],
        ...update,
      };
    }

    // Save the updated document
    await employeeData.save();

    // Send back the updated employee data
    res.json(employeeData);
  } catch (error) {
    // If there's an error, pass it to the error handling middleware
    next(error);
  }
};

module.exports = {
  getEmployeeWorkingData,
  updateEmployeeWorkingData,
};
