const HumanResourceManager = require('../managers/humanresource.manager.js');

module.exports = {

    //Fetch all employees info
    getAllEmployeesInfo: function (req, res) {
        HumanResourceManager.getAllEmployeesInfo(req, function (err, data) {
            if (err) {
                res.status(500).send({
                    message: err || "Some error occurred."
                });
            }
            else {
                res.send(data);
            }
        })
    },

    //Fetch employee info based on id or name
    getEmployeeInfoBasedOnIdOrName: function (req, res) {
        HumanResourceManager.getEmployeeInfoBasedOnIdOrName(req, function (err, data) {
            if (err) {
                res.status(500).send({
                    message: err || "Some error occurred."
                });
            }
            else {
                res.send(data);
            }
        })
    },

    //Create employee
    createEmployeeInfo: function (req, res) {
        HumanResourceManager.createEmployeeInfo(req, function (err, data) {
            if (err) {
                res.status(500).send({
                    message: err || "Some error occurred."
                });
            }
            else {
                res.send(data);
            }
        })
    },

    //Upate employee info
    updateEmployeeInfo: function (req, res) {
        HumanResourceManager.updateEmployeeInfo(req, function (err, data) {
            if (err) {
                res.status(500).send({
                    message: err || "Some error occurred."
                });
            }
            else {
                res.send(data);
            }
        })
    },

    //Delete employee info based on employeeId
    deleteEmployeeInfo: function (req, res) {
        HumanResourceManager.deleteEmployeeInfo(req, function (err, data) {
            if (err) {
                res.status(500).send({
                    message: err || "Some error occurred."
                });
            }
            else {
                res.send(data);
            }
        })
    },

    //Fetch all managers info
    getAllManagersInfo: function (req, res) {
        HumanResourceManager.getAllManagersInfo(req, function (err, data) {
            if (err) {
                res.status(500).send({
                    message: err || "Some error occurred."
                });
            }
            else {
                res.send(data);
            }
        })
    }
};