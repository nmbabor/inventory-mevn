const Company = require('./Company')
class CompanyController{
    async index(req,res,next){
        try{
            let company =await Company.find()
            return res.json(company)
        }catch(e){
            res.json(e)
        }
    }
    async store (req,res,next){
        try{
            let input=req.body
            let company = await Company.create(input)
            return res.status(201).json(company)
        }catch(e){
            res.status(500).json(e)
        }
    }

    async edit(req,res,next){
        try{
            let company = await Company.findById(req.params.id)
            return res.json(company)
        }catch(e){
            res.json(e)
        }
    }

    async update(req,res,next){
        try{
            let updatedInfo=req.body
            let company = await Company.findByIdAndUpdate(req.params.id,{$set:updatedInfo})
            return res.json(company)
        }catch(e){
            res.status(500).json(e)
        }
    }
}
module.exports = new CompanyController