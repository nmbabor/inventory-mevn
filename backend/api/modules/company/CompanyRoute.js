const express=require('express')
const route=express.Router()
const Controller = require('./CompanyController')
route.get('/', Controller.index)
route.post('/', Controller.store)
route.get('/:id', Controller.edit)
route.put('/:id', Controller.update)

module.exports = route