const User = require("../model/user.model");
const Employee = require("../model/employee.model")

const signup = async (req, res, next) => {
  const signupForm = req.body;

  if (!signupForm || Object.keys(signupForm).length === 0) {
    return res.status(400).json({ message: 'Signup form is empty' });
  }

  try {
    const newUser = new User(signupForm);
    await newUser.save();

    const newEmployee = new Employee({ employeeId: newUser.employeeId });
    await newEmployee.save();

    res.status(201).json({ message: 'User and employee created successfully' });
  } catch (error) {
    next(error);
  }
};


const signin = async (req, res, next) => {
  const { employeeId } = req.body;

  if (!employeeId) {
    return res.status(400).json({ message: 'Employee ID is required' });
  }

  try {
    const user = await User.findOne({ employeeId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
    
  } catch (error) {
    next(error);
  }
};


module.exports = {
  signup,
  signin
}