const Employee = require('./Employee')
const Company = require('../../company/Company')
const Branch = require('../../company/branch/Branch')
const User = require('../../primaryInfo/users/User')
const Designation = require('../designation/Designation')
const Section = require('../section/Section')
const mongoose = require('mongoose')
const util=require('util')
const Transaction = require('mongoose-transactions')
const bcrypt = require('bcryptjs')
const fs = require('fs')
const sharp=require('sharp')
const path = require('path')

class EmployeeController{

//View all Data
    async index(req,res,next){
        try{
            let match = {}
            if(req.decoded.role!='superadmin'){
                match = {company_id:mongoose.Types.ObjectId(req.decoded.company_id)}
                if(req.decoded.branch_id!=null){
                    match = {company_id:mongoose.Types.ObjectId(req.decoded.company_id),branch_id:mongoose.Types.ObjectId(req.decoded.branch_id)}
                }
            }
            let allData = await Employee.aggregate([
                {
                    $lookup:{
                        from:'users',
                        localField:'user_id',
                        foreignField:'_id',
                        as:'user'
                    }
                },
                {$unwind:'$user'},
                {
                    $lookup:{
                        from:'companies',
                        localField:'user.company_id',
                        foreignField:'_id',
                        as:'company'
                    }
                },
                {$unwind:'$company'},
                {
                    $lookup:{
                        from:'branches',
                        localField:'user.branch_id',
                        foreignField:'_id',
                        as:'branch'
                    }
                },
                {$unwind:'$branch'},
                {
                    $project:{
                        details:1,
                        status:1,
                        employee_id:1,
                        user_id:1,
                        name:"$user.name",
                        email:"$user.email",
                        mobile:"$user.mobile",
                        company_name:"$company.company_name",
                        branch_name:"$branch.name",

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
            let data =await Employee.aggregate([
                {
                    $lookup:{
                        from:'users',
                        localField:'user_id',
                        foreignField:'_id',
                        as:'user'
                    }
                },
                {
                    $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$user", 0 ] }, "$$ROOT" ] } }
                },
                { $project: { user: 0 } },
                {"$match":{_id:mongoose.Types.ObjectId(req.params.id)}}
            ])
            return res.json(data[0])
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
            req.checkBody('email', 'Email is required').isEmail()
            let errors = []
            if(req.validationErrors()){
                errors=req.validationErrors()
            }
            let email = await User.find({email:input.email})
            let mobile = await User.find({mobile:input.mobile})
            let employee_id = await Employee.find({employee_id:input.employee_id})
            if(email.length>0){
                errors.push({msg:'Email is unique',param:'email'})
            }
            if(mobile.length>0){
                errors.push({msg:'Mobile number is unique',param:'mobile'})
            }
            if(employee_id.length>0){
                errors.push({msg:'Employee ID is unique',param:'employee_id'})
            }
            if (errors.length>0) {
                let newOne = {}
                errors.forEach(nerr=>{
                    newOne[nerr.param] = nerr.msg
                })
                return res.status(422).json(newOne);
            }

            let user_id = transaction.insert('User', {
                name:req.body.name,
                email:req.body.email,
                password: await  bcrypt.hash('123456', 10),
                mobile:req.body.mobile,
                address:req.body.address,
                role:'employee',
                company_id:req.body.company_id,
                branch_id:req.body.branch_id,
                created_by:req.decoded._id,
            })
            input.user_id = user_id
            if (req.files!==null){
                let file=req.files.photo
                let dirName='upload/images/employee/'
                if (!fs.existsSync(dirName)){
                    fs.mkdirSync(dirName);
                }
                let randName=Math.random().toString(36).substring(2, 15)
                let ext = path.extname(file.name)
                sharp(req.files.photo.data).resize(
                    {width: 200,height: 200, fit: sharp.fit.cover, position: sharp.strategy.entropy}
                ).toFile(dirName+randName+ext)
               input.photo='images/employee/'+randName+ext
            }
            let employeeId = transaction.insert('Employee',input)
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
            req.checkBody('email', 'Email is required').isEmail()
            let errors = []
            if(req.validationErrors()){
                errors=req.validationErrors()
            }
            let email = await User.find({$and:[{email:req.body.email},{_id:{$ne:input.user_id}}]})
            let mobile = await User.find({$and:[{mobile:req.body.mobile},{_id:{$ne:input.user_id}}]})
            let employee_id = await Employee.find({$and:[{employee_id:req.body.employee_id},{_id:{$ne:id}}]})
            if(email.length>0){
                errors.push({msg:'Email is unique',param:'email'})
            }
            if(mobile.length>0){
                errors.push({msg:'Mobile number is unique',param:'mobile'})
            }
            if(employee_id.length>0){
                errors.push({msg:'Employee ID is unique',param:'employee_id'})
            }
            if (errors.length>0) {
                let newOne = {}
                errors.forEach(nerr=>{
                    newOne[nerr.param] = nerr.msg
                })
                return res.status(422).json(newOne);
            }
            transaction.update('User', input.user_id, {
                name: req.body.name,
                email: req.body.email,
                mobile: req.body.mobile,
                address: req.body.address,
                company_id: req.body.company_id,
                branch_id: req.body.branch_id,
            })
            if (req.files!==null){
                let file=req.files.photo
                let dirName='upload/images/employee/'
                if (!fs.existsSync(dirName)){
                    fs.mkdirSync(dirName);
                }
                let randName=Math.random().toString(36).substring(2, 15)
                let ext = path.extname(file.name)
                sharp(req.files.photo.data).resize(
                    {width: 200,height: 200, fit: sharp.fit.cover, position: sharp.strategy.entropy}
                ).toFile(dirName+randName+ext)
                input.photo='images/employee/'+randName+ext
            }
            let employee =await Employee.findById(id)
            transaction.update('Employee',id,input)
            if (req.files!==null){
                if (fs.existsSync('upload/'+employee.photo)) {
                    fs.unlink('upload/'+employee.photo,function (errs) {
                        if (errs) {console.log(errs)}
                    })
                }
            }
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
            res.status(500).json(e)
            transaction.clean()
        }
    }
    //Delete data
    delete(req, res,next) {
        Employee.remove({
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
            let company = await Company.find({status:1})
            return res.json(company)
        }catch(e){
            res.json(e)
        }
    }
    async branch(req,res,next){
        try{
            let data = await Branch.find({status:1,company_id:req.params.id})
            return res.json(data)
        }catch(e){
            res.json(e)
        }
    }
    async designation(req,res,next){
        try{
            let data = await Designation.find({status:1})
            return res.json(data)
        }catch(e){
            res.json(e)
        }
    }
    async section(req,res,next){
        try{
            let data = await Section.find({status:1})
            return res.json(data)
        }catch(e){
            res.json(e)
        }
    }
}
module.exports = new EmployeeController;