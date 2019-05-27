module.exports = (app) => {
    const humanResource = require('../controllers/humanresource.controller.js');

    //Fetch all employees info
    app.get('/employees', humanResource.getAllEmployeesInfo);

    //Fetch employee info based on id or name
    app.get('/employees/:employeeIdOrName', humanResource.getEmployeeInfoBasedOnIdOrName);

    //create employee
    app.post('/employees/createEmployeeInfo', humanResource.createEmployeeInfo);

    //Upate employee info
    app.post('/employees/updateEmployeeInfo', humanResource.updateEmployeeInfo);

    //Delete employee info
    app.delete('/employees/:employeeId', humanResource.deleteEmployeeInfo);

    //Fetch all managers info
    app.get('/managers', humanResource.getAllManagersInfo);
}