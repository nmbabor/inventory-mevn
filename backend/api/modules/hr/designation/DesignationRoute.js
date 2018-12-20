const express = require('express')
const route = express.Router();
const Controller = require('./DesignationController')

route.get('/',Controller.index);
route.post('/',Controller.store);
route.post('/bulk',Controller.bulkStore);
route.get('/:id',Controller.show);
route.put('/:id',Controller.update);
route.delete('/:id',Controller.delete);
module.exports = route
