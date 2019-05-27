const mongoose = require('mongoose');

//creating the employee schema w.r.t mongodb
const Employees = mongoose.Schema({
    id: Number,
    firstName: String,
    lastName: String,
    designationId: Number,
    managerId: Number,
    hireDate: Date,
    email: String,
    phoneNumber: String,
    imageUrl: String,
    timeWorked: String
}, { collection: 'Employees' });

module.exports = mongoose.model('Employees', Employees);