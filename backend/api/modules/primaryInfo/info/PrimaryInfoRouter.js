const express=require('express')
const route=express.Router()

const Controller=require('./PrimaryInfoController')
route.get('/', Controller.edit)
route.put('/', Controller.update)
route.post('/',Controller.store)

module.exports=route