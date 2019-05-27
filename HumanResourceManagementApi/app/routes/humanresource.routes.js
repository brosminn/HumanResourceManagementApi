module.exports = (app) => {
    const humanResource = require('../controllers/humanresource.controller.js');

    //Fetch all employees info
    app.get('/employees', humanResource.getAllEmployeesInfo);

    //Fetch employee info based on id or name
    app.get('/employees/search/:employeeIdOrName', humanResource.search);

    //Fetch all employees info
    app.get('/employees/:id', humanResource.getEmployeeById);

    //create employee
    app.post('/employees', humanResource.createEmployeeInfo);

    //Upate employee info
    app.put('/employees', humanResource.updateEmployeeInfo);

    //Delete employee info
    app.delete('/employees/:id', humanResource.deleteEmployeeInfo);

    //Fetch all managers info
    app.get('/managers', humanResource.getAllManagersInfo);
}
