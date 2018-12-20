const express = require('express')
const route = express.Router();
const DistrictsController = require('./DistrictsController')

route.get('/',DistrictsController.index);
route.post('/',DistrictsController.store);
route.get('/active',DistrictsController.activeDistricts);
route.post('/bulk-districts',DistrictsController.bulkDistrictsSave);
route.get('/:id',DistrictsController.show);
route.put('/:id',DistrictsController.update);
route.delete('/:id',DistrictsController.destroy);

module.exports = route
