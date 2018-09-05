const mongoose = require('mongoose')
const ProjectSchema = require('./projectSchema')
const Schema = mongoose.Schema

const DailyProjectSchema = new Schema({
    project: ProjectSchema,
    spentTime: Number
});

module.exports = DailyProjectSchema