const mongoose = require('mongoose')

// Create game schema
const gameSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    player: {
        type: Number,
        required: true
    },
    opponent: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Game', gameSchema);