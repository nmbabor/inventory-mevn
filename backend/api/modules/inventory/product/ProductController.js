const Product = require('./Product')
const Company = require('../../company/Company')
const Category = require('../category/Category')
const Units = require('../units/Units')
const mongoose = require('mongoose')

class ProductController{

//View all Data
    async index(req,res,next){
        try{
            let match = {}
            if(req.decoded.role!='superadmin'){
                match = {company_id:mongoose.Types.ObjectId(req.decoded.company_id)}
            }
            let allData = await Product.aggregate([
                {
                    $lookup:{
                        from:'companies',
                        localField:'company_id',
                        foreignField:'_id',
                        as:'company'
                    }
                },
                {
                    $lookup:{
                        from:'categories',
                        localField:'category_id',
                        foreignField:'_id',
                        as:'category'
                    }
                },
                {$unwind:'$company'},
                {$unwind:'$category'},
                {
                    $project:{
                        name:1,
                        details:1,
                        status:1,
                        code:1,
                        category_id:1,
                        company_id:1,
                        company_name:"$company.company_name",
                        category_name:"$category.name"

                    }
                },
                { "$match" : match},
            ])
            return res.json(allData)
        }catch(e){
            res.json(e)
        }
    }
//single user show
    async show(req,res,next){
        try{
            let data = await Product.findById(req.params.id)
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
            let data = await Product.create(input)
            return res.status(201).json(data)
        }catch(e){
            res.status(500).json(e)
        }
    }
    // Update single data
    async update (req,res,next) {
        try{
            let data = await Product.findByIdAndUpdate(req.params.id,{$set:req.body})
            return res.json(data)
        }catch(e){
            res.status(500).json(e)
        }
    }
    //Delete data
    delete(req, res,next) {
        Product.remove({
            _id: req.params.id
        }, function (err, result) {
            if (err)
                res.send(err)
            res.send({
                success: true
            })
        })
    }
    async company(req,res,next){
        try{
            let company = await Company.find({status:1},'_id company_name')
            return res.json(company)
        }catch(e){
            res.json(e)
        }
    }
    async category(req,res,next){
        try{
            let data = await Category.find({status:1},'_id name')
            return res.json(data)
        }catch(e){
            res.json(e)
        }
    }
    async units(req,res,next){
        try{
            let data = await Units.find({status:1},'_id name')
            return res.json(data)
        }catch(e){
            res.json(e)
        }
    }
}
module.exports = new ProductController;