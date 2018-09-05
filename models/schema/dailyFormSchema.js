const mongoose = require('mongoose')
const DailyStaffSchema = require('./dailyStaffSchema')
const Schema = mongoose.Schema

const DailyFormSchema = new Schema({
    date: Date,
    dailyStaff: [DailyStaffSchema]
});

module.exports = DailyFormSchema