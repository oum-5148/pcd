const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    AdminName: String,
    CompanyName: String, 
    Email: String, 
    Password: String,
    Address: String,
    PhoneNumber: Number,
    role: { type: String, default: 'admin' } // Default role is 'admin'
});

const companyModel = mongoose.model("companies", companySchema);

module.exports = companyModel;
