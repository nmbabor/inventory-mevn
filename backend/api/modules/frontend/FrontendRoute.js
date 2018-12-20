const express = require('express')
const route = express.Router();
const FrontendController = require('./FrontendController')

route.get('/',FrontendController.module);
route.get('/info',FrontendController.primaryInfo);
route.get('/district',FrontendController.activeDistricts);
module.exports = route
