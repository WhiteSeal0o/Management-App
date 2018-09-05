const mongoose = require('mongoose')
const ProjectSchema = require('./projectSchema')
const Schema = mongoose.Schema

const StaffSchema = new Schema({
    id: String,
    name: String,
    projects: [ProjectSchema]
});

module.exports = StaffSchema