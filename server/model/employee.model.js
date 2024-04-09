"use strict";
const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const httpStatus = require("http-status");

const Schema = mongoose.Schema;

const WorkingDaySchema = new Schema(
  {
    isWorking: {
      type: Boolean,
    },
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
    date: {
      type: String,
    },
    breakTime: {
      type: String,
    },
    dayOfWeek: {
      type: String,
    },
  },
  { timestamps: false, id: false }
);

const employeeSchema = new Schema(
  {
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },
    workingDays: {
        type: [WorkingDaySchema],
        default: []
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Employee", employeeSchema);
