const Depot = require('./Depot')
const Company = require('../../company/Company')
const Branch = require('../../company/branch/Branch')
const Area = require('../../primaryInfo/area/Area')
class DepotController{
    async index(req,res,next){
        try{
            let allData = await Depot.aggregate([
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
                        name:'$name',
                        company_name:'$company.company_name',
                        type:'$type',
                        details:'$details',
                        branch_id:"$branch_id",
                        area_id:"$area_id",
                        company_id:"$company_id",
                        status:"$status",
                    }
                }
            ])
            let mainData = []
            for (let i = 0; i<allData.length; i++){
                let area = {};
                let branch = {};
                if(allData[i].branch_id!=null){
                    branch = await Branch.findOne({_id:allData[i].branch_id},'_id name')
                }
                if(allData[i].area_id!=null){
                    area = await Area.findOne({_id:allData[i].area_id},'_id name')
                }
                allData[i].branch=branch
                allData[i].area=area
                mainData.push(allData[i])
            }
            return res.json(mainData)
        }catch(e){
            res.json(e)
        }
    }
    async store (req,res,next){
        try{
            let input=req.body
            input.created_by = req.decoded._id
            if(input.branch_id==''){
                input.branch_id=null
            }
            if(input.area_id==''){
                input.area_id=null
            }
            let data = await Depot.create(input)
            return res.status(201).json(data)
        }catch(e){
            res.status(500).json(e)
        }
    }

    async edit(req,res,next){
        try{
            let data = await Depot.findById(req.params.id)
            return res.json(data)
        }catch(e){
            res.json(e)
        }
    }

    async update(req,res,next){
        try{
            let input=req.body
            if(input.branch_id==''){
                input.branch_id=null
            }
            if(input.area_id==''){
                input.area_id=null
            }
            let data = await Depot.findByIdAndUpdate(req.params.id,{$set:input})
            return res.json(data)
        }catch(e){
            res.status(500).json(e)
        }
    }
    async company(req,res,next){
        try{
            let company = await Company.find({status:1})
            return res.json(company)
        }catch(e){
            res.json(e)
        }
    }
    async area(req,res,next){
        try{
            let data = await Area.find({status:1})
            return res.json(data)
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
}
module.exports = new DepotController