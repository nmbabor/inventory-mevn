const express = require('express')
const route = express.Router();
const Controller = require('./ProductController')

route.get('/',Controller.index);
route.post('/',Controller.store);
route.get('/company',Controller.company);
route.get('/category',Controller.category);
route.get('/units',Controller.units);
route.get('/:id',Controller.show);
route.put('/:id',Controller.update);
route.delete('/:id',Controller.delete);
module.exports = route
