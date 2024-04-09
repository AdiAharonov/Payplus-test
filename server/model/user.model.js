'use strict'
const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const httpStatus = require('http-status')

const Schema = mongoose.Schema


const userSchema = new Schema({
  employeeId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 128
  },
  firstName: {
    type: String,
    maxlength: 50
  },
  lastName: {
    type: String,
    maxlength: 50
  },
}, {
  timestamps: true
})



module.exports = mongoose.model('User', userSchema)
