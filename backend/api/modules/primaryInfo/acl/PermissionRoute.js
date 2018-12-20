const express = require('express')
const route = express.Router();
const PermissionController = require('./PermissionController')

route.get('/',PermissionController.index);
route.post('/',PermissionController.store);
route.get('/:id',PermissionController.show);
route.put('/:id',PermissionController.update);
route.delete('/:id',PermissionController.delete);
module.exports = route
