const Units = require('./Units')
const mongoose = require('mongoose')

class UnitsController{

//View all Data
    async index(req,res,next){
        try{
            let data = await Units.find()
            return res.json(data)
        }catch(e){
            res.json(e)
        }
    }
//single user show
    async show(req,res,next){
        try{
            let data = await Units.findById(req.params.id)
            return res.json(data)
        }catch(e){
            res.json(e)
        }
    }
//Store Data into DB
    async store(req,res,next){
        try{
            let input=req.body
            input.created_by = req.decoded._id
            let data = await Units.create(input)
            return res.status(201).json(data)
        }catch(e){
            res.status(500).json(e)
        }
    }
    // Update single data
    async update (req,res,next) {
        try{
            let data = await Units.findByIdAndUpdate(req.params.id,{$set:req.body})
            return res.json(data)
        }catch(e){
            res.status(500).json(e)
        }
    }
    //Delete data
    delete(req, res,next) {
        Units.remove({
            _id: req.params.id
        }, function (err, result) {
            if (err)
                res.send(err)
            res.send({
                success: true
            })
        })
    }
}
module.exports = new UnitsController;