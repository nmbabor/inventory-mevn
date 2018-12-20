const express = require('express')
const route = express.Router();
const Controller = require('./BranchController')

route.get('/:company_id',Controller.index);
route.post('/:company_id',Controller.store);
route.get('/:company_id/serial',Controller.serial);
route.get('/show/:id',Controller.show);
route.put('/:id',Controller.update);
route.delete('/:id',Controller.delete);
route.get('/:company_id/serial',Controller.serial);
module.exports = route
