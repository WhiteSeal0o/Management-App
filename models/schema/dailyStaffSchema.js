const mongoose = require('mongoose')
const DailyProjectSchema = require('./dailyProjectSchema')
const StaffSchema = require('./staffSchema')
const Schema = mongoose.Schema

const DailyStaffSchema = new Schema({
    staff: StaffSchema,
    projects: [DailyProjectSchema],
    idle: Number,
    absent: Number
});

module.exports = DailyStaffSchema