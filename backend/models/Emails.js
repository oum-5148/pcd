const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
    body:String,
    creationDate: {
        type: Date,
        default: Date.now
    }    
});

const Email = mongoose.model('email', emailSchema);

module.exports = Email;
