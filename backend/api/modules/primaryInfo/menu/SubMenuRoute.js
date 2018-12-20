const express = require('express')
const route = express.Router();
const SubMenuController = require('./SubMenuController')

route.get('/:menu_id',SubMenuController.index);
route.post('/:menu_id',SubMenuController.store);
route.get('/:menu_id/serial',SubMenuController.serial);
route.get('/show/:id',SubMenuController.show);
route.put('/:id',SubMenuController.update);
route.delete('/:id',SubMenuController.delete);
route.get('/:menu_id/serial',SubMenuController.serial);
module.exports = route
