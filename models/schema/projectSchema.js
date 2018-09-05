const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    isLyzon: {
        type: Boolean,
        default: false
    }
});

module.exports = ProjectSchema