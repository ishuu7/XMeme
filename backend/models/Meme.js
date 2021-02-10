const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const MemeSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Memes', MemeSchema);