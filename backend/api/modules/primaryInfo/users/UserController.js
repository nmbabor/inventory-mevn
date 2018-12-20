const User = require('./User')
const Role = require('../acl/Role')
const Company = require('../../company/Company')
const bcrypt = require('bcryptjs');
class UserController{
    async index(req,res,next){
        try{
            let allData = await User.find()
            return res.json(allData)
        }catch(e){
            res.json(e)
        }
    }
    async store (req,res,next){
        try{
            let input=req.body
            if(input.branch_id==''){
                input.branch_id=null
            }
            if(input.company_id==''){
                input.company_id=null
            }
            input.password = await  bcrypt.hash(req.body.password, 10);
            let data = await User.create(input)
            return res.status(201).json(data)
        }catch(e){
            res.status(500).json(e)
        }
    }

    async edit(req,res,next){
        try{
            let data = await User.findById(req.params.id)
            return res.json(data)
        }catch(e){
            res.json(e)
        }
    }

    async update(req,res,next){
        try{
            let updatedInfo=req.body
            if(updatedInfo.branch_id==''){
                updatedInfo.branch_id=null
            }
            if(updatedInfo.company_id==''){
                updatedInfo.company_id=null
            }
            let company = await User.findByIdAndUpdate(req.params.id,{$set:updatedInfo})
            return res.json(company)
        }catch(e){
            res.status(500).json(e)
        }
    }
    /* All Active Role */
    async roles(req,res,next){
        try{
            let role = await Role.find({status:1})
            return res.json(role)
        }catch(e){
            res.json(e)
        }
    }
    /* All Active Company */
    async company(req,res,next){
        try{
            let company = await Company.find({status:1},'company_name _id')
            return res.json(company)
        }catch(e){
            res.json(e)
        }
    }

}

module.exports = new UserController