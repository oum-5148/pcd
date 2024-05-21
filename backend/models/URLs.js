const mongoose = require('mongoose');

const URLSchema = new mongoose.Schema({
    link: String,
    creationDate: {
        type: Date,
        default: Date.now
    }
});

const URL = mongoose.model('URL', URLSchema);

module.exports = URL;
