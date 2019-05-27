const Employees = require('../models/employee.model.js');

var employeeManager = module.exports = {
    getAllEmployeesInfo: function (req, res) {
        Employees.find()
            .then(employees => {
                for (var i = 0; i < employees.length; i++) {
                    var hiredDate = new Date(employees[i].hireDate);
                    //calculating the timeworked in days
                    employees[i].timeWorked = Math.round((new Date() - hiredDate) / (1000 * 60 * 60 * 24));
                }

                res(null, employees);
            }).catch(err => {
                res(err, null);
            });
    },

    getEmployeeInfoBasedOnIdOrName: function (req, res) {
        //since id is of number datatype, we need to convert the search input to int datatype
        var idToSearch = Number.POSITIVE_INFINITY;
        if (Number.isNaN(parseInt(req.params.employeeIdOrName))) {
            idToSearch = Number.POSITIVE_INFINITY; //setting to some random value if the input is not number
        }
        else {
            idToSearch = parseInt(req.params.employeeIdOrName);
        }
        var regexSearchTerm = new RegExp(["^", req.params.employeeIdOrName, "$"].join(""), "i");
        Employees.find({ $or: [{ id: idToSearch }, { firstName: regexSearchTerm }, { lastName: regexSearchTerm }] })
            .then(employees => {
                for (var i = 0; i < employees.length; i++) {
                    var hiredDate = new Date(employees[i].hireDate);
                    //calculating the timeworked in days
                    employees[i].timeWorked = Math.round((new Date() - hiredDate) / (1000 * 60 * 60 * 24));
                }
                if (!employees) {
                    res("Employee info not found with id " + req.params.employeeIdOrName, null);
                }
                res(null, employees);
            }).catch(err => {
                res(err, null);
            });
    },

    createEmployeeInfo: function (req, res) {
        if (!req.body) {
            res("Request cannot be empty.", null);
        }

        Employees.find()
            .then(employees => {
                //getting the max empid from mongodb and incrementing it by 1 to create new empid
                var newEmpId = parseInt(Math.max.apply(Math, employees.map(function (temp) { return temp.id; }))) + 1;

                //Check if the employee is manager or developer
                if (req.body.designationId == 3) //if manager
                {
                    const employee = new Employees({
                        id: newEmpId,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        designationId: req.body.designationId,
                        managerId: null,
                        hireDate: new Date(req.body.hireDate), //converting to date obj
                        email: req.body.email,
                        phoneNumber: req.body.phoneNumber,
                        imageUrl: req.body.imageUrl
                    });

                    // Save the new employee in the database
                    employee.save()
                        .then(data => {
                            res(null, employee);
                        }).catch(err => {
                            res(err, null);
                        });
                }
                else { //if developer
                    var resultArr = employees.map(function (temp) { return (temp.id == req.body.managerId && temp.designationId == 3); });
                    if (resultArr.indexOf(true) > -1) { //if manager is valid
                        // Create a employee
                        const employee = new Employees({
                            id: newEmpId,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            designationId: req.body.designationId,
                            managerId: req.body.managerId,
                            hireDate: new Date(req.body.hireDate), //converting to date obj
                            email: req.body.email,
                            phoneNumber: req.body.phoneNumber,
                            imageUrl: req.body.imageUrl
                        });

                        // Save the new employee in the database
                        employee.save()
                            .then(data => {
                                res(null, employee);
                            }).catch(err => {
                                res(err, null);
                            });
                    }
                    else { //if manager is not valid
                        res("Invalid manager id.", null);
                    }
                }
            }).catch(err => {
                res(err, null);
            });
    },

    updateEmployeeInfo: function (req, res) {
        //forming the filter query to pick data using mongoose
        var query = { 'id': req.body.id };
        req.body.hireDate = new Date(req.body.hireDate); //converting to date obj

        Employees.findOneAndUpdate(query, req.body, { upsert: true }, function (err, doc) {
            if (err) res(err, null);
            else res(null, req.body);
        });
    },

    deleteEmployeeInfo: function (req, res) {
        //forming the filter query to pick data using mongoose
        var query = { 'id': req.params.employeeId };
        Employees.deleteOne(query, function (err, doc) {
            if (err) res(err, null);
            else res(null, doc);
        });
    },

    getAllManagersInfo: function (req, res) {
        Employees.find({ designationId: 3 }) //hardcoding the designationid to 3 as per the enum value set in UI
            .then(employees => {
                for (var i = 0; i < employees.length; i++) {
                    var hiredDate = new Date(employees[i].hireDate);
                    employees[i].timeWorked = Math.round((new Date() - hiredDate) / (1000 * 60 * 60 * 24));
                }
                if (!employees) {
                    res("Managers info not found.", null);
                }
                res(null, employees);
            }).catch(err => {
                res(err, null);
            });
    }
};