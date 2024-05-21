const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    CIN: Number,
    firstName: String,
    lastName: String, 
    email: String, 
    role: { type: String, default: 'user' }, // Default role is 'user'
    phonenumber: Number,
    password: String,
}, { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
