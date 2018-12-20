const express = require('express')
const route = express.Router();
const ModuleController = require('./ModuleController')

route.get('/',ModuleController.index);
route.post('/',ModuleController.store);
route.get('/serial',ModuleController.serial);
route.get('/permissions',ModuleController.permissions);
route.get('/:id',ModuleController.show);
route.put('/:id',ModuleController.update);
route.delete('/:id',ModuleController.delete);
module.exports = route
