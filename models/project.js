const mongoose = require('mongoose')
const ProjectSchema = require('./schema/projectSchema')

const Project = mongoose.model('project', ProjectSchema)

module.exports = Project