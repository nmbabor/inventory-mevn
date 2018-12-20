const express = require('express')
const route = express.Router();
const MenuController = require('./MenuController')

route.get('/:module_id',MenuController.index);
route.post('/:module_id',MenuController.store);
route.get('/:module_id/serial',MenuController.serial);
route.get('/show/:id',MenuController.show);
route.put('/:id',MenuController.update);
route.delete('/:id',MenuController.delete);
route.get('/:module_id/serial',MenuController.serial);
module.exports = route
