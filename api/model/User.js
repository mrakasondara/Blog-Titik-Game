const mongoose = require('mongoose')
const {model,Schema} = mongoose

const UserSchema = new Schema({
    fullname : {type: String, min:3},
    username : {type: String, min:3, unique: true},
    password: {type: String, min:5}
})
const User = model('User',UserSchema)

module.exports = User