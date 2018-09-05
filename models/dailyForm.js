const mongoose = require('mongoose')
const DailyFormSchema = require('./schema/dailyFormSchema')

const DailyForm = mongoose.model('dailyForm', DailyFormSchema)

module.exports = DailyForm