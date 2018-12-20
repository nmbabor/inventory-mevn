const Vendor = require('./Vendor')
const Company = require('../../company/Company')
const Category = require('../category/Category')
const mongoose = require('mongoose')
const Transaction = require('mongoose-transactions')
const fs = require('fs')
const sharp=require('sharp')
const path = require('path')

class VendorController{

//View all Data
    async index(req,res,next){
        try{
            let match = {}
            if(req.decoded.role!='superadmin'){
                match = {company_id:mongoose.Types.ObjectId(req.decoded.company_id)}
            }
            let allData = await Vendor.aggregate([
                {
                    $lookup:{
                        from:'companies',
                        localField:'company_id',
                        foreignField:'_id',
                        as:'company'
                    }
                },
                {$unwind:'$company'},
                {
                    $project:{
                        name:1,
                        vendor_id:1,
                        status:1,
                        mobile:1,
                        address:1,
                        company_id:1,
                        representative_name:1,
                        company_name:"$company.company_name"

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
            let data = await Vendor.findById(req.params.id)
            return res.json(data)
        }catch(e){
            res.json(e)
        }
    }
//Store Data into DB
    async store(req,res,next){
        const transaction = new Transaction()
        let input=req.body
        try{
            req.checkBody('name', 'Name is required').notEmpty()
            req.checkBody('vendor_id', 'Vendor ID is required').notEmpty()
            let errors = []
            if(req.validationErrors()){
                errors=req.validationErrors()
            }
            let vendor_id = await Vendor.find({vendor_id:input.vendor_id})
            if(vendor_id.length>0){
                errors.push({msg:'Vendor ID is unique',param:'vendor_id'})
            }
            if (errors.length>0) {
                let newOne = {}
                errors.forEach(nerr=>{
                    newOne[nerr.param] = nerr.msg
                })
                return res.status(422).json(newOne);
            }

            if (req.files.logo!==null){
                let file=req.files.logo
                let dirName='upload/images/vendor/'
                if (!fs.existsSync(dirName)){
                    fs.mkdirSync(dirName);
                }
                let randName=Math.random().toString(24).substring(2, 15)
                let ext = path.extname(file.name)
                sharp(req.files.logo.data).toFile(dirName+randName+ext)
                input.logo='images/vendor/'+randName+ext
            }
            if (req.files.photo!==null){
                let file=req.files.photo
                let dirName='upload/images/vendor/'
                if (!fs.existsSync(dirName)){
                    fs.mkdirSync(dirName);
                }
                let randName=Math.random().toString(36).substring(2, 15)
                let ext = path.extname(file.name)
                sharp(req.files.photo.data).resize(
                    {width: 200,height: 200, fit: sharp.fit.cover, position: sharp.strategy.entropy}
                ).toFile(dirName+randName+ext)
                input.photo='images/vendor/'+randName+ext
            }
            input.created_by = req.decoded._id
            let employeeId = transaction.insert('Vendor',input)
            const final = await transaction.run()
            transaction.clean()
            return res.status(201).json('Successfully Added')
        }catch(e){
            const rollbackObj = await transaction.rollback().catch(err=>{
                console.log('Error Found!')
            })
            if (fs.existsSync('upload/'+input.photo)) {
                fs.unlink('upload/'+input.photo,function (errs) {
                    if (errs) {console.log(errs)}
                })
            }
            if (fs.existsSync('upload/'+input.logo)) {
                fs.unlink('upload/'+input.logo,function (errs) {
                    if (errs) {console.log(errs)}
                })
            }
            res.status(500).json(e)
            transaction.clean()
        }
    }
    // Update single data
    async update (req,res,next) {
        const transaction = new Transaction()
        let input=req.body
        let id = req.params.id
        try{
            req.checkBody('name', 'Name is required').notEmpty()
            req.checkBody('vendor_id', 'Vendor ID is required').notEmpty()
            let errors = []
            if(req.validationErrors()){
                errors=req.validationErrors()
            }
            let vendor_id = await Vendor.find({$and:[{vendor_id:req.body.vendor_id},{_id:{$ne:id}}]})
            if(vendor_id.length>0){
                errors.push({msg:'Vendor ID is unique',param:'vendor_id'})
            }
            if (errors.length>0) {
                let newOne = {}
                errors.forEach(nerr=>{
                    newOne[nerr.param] = nerr.msg
                })
                return res.status(422).json(newOne);
            }
            if(req.files!==null){
                if (typeof req.files.logo!=='undefined'){
                    let file=req.files.logo
                    let dirName='upload/images/vendor/'
                    if (!fs.existsSync(dirName)){
                        fs.mkdirSync(dirName);
                    }
                    let randName=Math.random().toString(24).substring(2, 15)
                    let ext = path.extname(file.name)
                    sharp(req.files.logo.data).toFile(dirName+randName+ext)
                    input.logo='images/vendor/'+randName+ext
                }
                if (typeof req.files.photo!=='undefined'){
                    let file=req.files.photo
                    let dirName='upload/images/vendor/'
                    if (!fs.existsSync(dirName)){
                        fs.mkdirSync(dirName);
                    }
                    let randName=Math.random().toString(36).substring(2, 15)
                    let ext = path.extname(file.name)
                    sharp(req.files.photo.data).resize(
                        {width: 200,height: 200, fit: sharp.fit.cover, position: sharp.strategy.entropy}
                    ).toFile(dirName+randName+ext)
                    input.photo='images/vendor/'+randName+ext
                }
            }
            let vendor = await Vendor.findById(id)
            transaction.update('Vendor',id,input)
            if(req.files!==null){
                /* Delete old Logo */
                if (typeof req.files.logo!=='undefined'){
                    if (fs.existsSync('upload/'+vendor.logo)) {
                        fs.unlink('upload/'+vendor.logo,function (errs) {
                            if (errs) {console.log(errs)}
                        })
                    }
                }
                /* Delete old Photo */
                if (typeof req.files.photo!=='undefined'){
                    if (fs.existsSync('upload/'+vendor.photo)) {
                        fs.unlink('upload/'+vendor.photo,function (errs) {
                            if (errs) {console.log(errs)}
                        })
                    }
                }
            }

            const final = await transaction.run()
            transaction.clean()
            return res.status(201).json('Successfully Added')
        }catch(e) {
            const rollbackObj = await transaction.rollback().catch(err => {
                console.log(err)
            })
            if(req.files!==null) {
                if (typeof req.files.photo !== 'undefined') {
                    if (fs.existsSync('upload/' + input.photo)) {
                        fs.unlink('upload/' + input.photo, function (errs) {
                            if (errs) {
                                console.log(errs)
                            }
                        })
                    }
                }
                if (typeof req.files.logo !== 'undefined') {
                    if (fs.existsSync('upload/' + input.logo)) {
                        fs.unlink('upload/' + input.logo, function (errs) {
                            if (errs) {
                                console.log(errs)
                            }
                        })
                    }
                }
            }
            console.log(e)
            res.status(500).json(e)
            transaction.clean()
        }
    }
    //Delete data
    delete(req, res,next) {
        Vendor.remove({
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
}
module.exports = new VendorController;