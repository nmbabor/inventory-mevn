const express=require('express')
const route=express.Router()
const Controller = require('./DepotController')
route.get('/', Controller.index)
route.post('/', Controller.store)
route.get('/company', Controller.company)
route.get('/area', Controller.area)
route.get('/branch/:id', Controller.branch)
route.get('/:id', Controller.edit)
route.put('/:id', Controller.update)

module.exports = route