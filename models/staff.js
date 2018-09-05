const mongoose = require('mongoose')
const StaffSchema = require('./schema/staffSchema')

const Staff = mongoose.model('staff', StaffSchema)

module.exports = Staff