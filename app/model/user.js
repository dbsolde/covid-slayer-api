const mongoose = require('mongoose')

// Let's create a user schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatarImage: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema);