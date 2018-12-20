const express = require('express')
const route = express.Router();
const Controller = require('./EmployeeController')

route.get('/',Controller.index);
route.post('/',Controller.store);
route.get('/company',Controller.company);
route.get('/section',Controller.section);
route.get('/designation',Controller.designation);
route.get('/branch/:id',Controller.branch);
route.get('/:id',Controller.show);
route.put('/:id',Controller.update);
route.delete('/:id',Controller.delete);
module.exports = route
