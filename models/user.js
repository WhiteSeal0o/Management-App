const mongoose = require('mongoose')
const UserSchema = require('./schema/userSchema')

const User = mongoose.model('user', UserSchema)

module.exports = User