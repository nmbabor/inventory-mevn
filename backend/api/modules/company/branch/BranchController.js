const Branch = require('./Branch')
const Company = require('../Company')

class BranchController{

//View all Data
    index(req,res,next){
        Company.findById(req.params.company_id).then(company=>{
            Branch.find({company_id: req.params.company_id})
                .then(allData => {
                    res.status(200).json({
                        company,
                        allData
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        message:'Some Error found!',
                        error:err
                    })
                })
        }).catch(error=>{
            res.status(500).json({
                message:'Company not found!',
                error:error
            })
        })

    }
//single user show
    show(req,res,next){
        Branch.findById(req.params.id).then(data => {
            res.status(200).json({
                data
            })
        })
            .catch(err => {
                res.status(500).json({
                    message:'Some Error found!',
                    error:err
                })
            })
    }
//Store Data into DB
    store(req,res,next){
        let company_id = req.params.company_id
        let inputData = req.body;
        inputData.company_id = company_id
        const branch = new Branch(inputData)
        branch.save().then(data=>{
            res.status(201).json({
                message: 'Data successfully inserted.',
                result: data
            }).catch(err => {
                res.status(500).json({
                    message:'Some Error found!',
                    error:err
                })
            })
        })
    }
    // Update single data
    update (req,res,next) {
        let id = req.params.id
        let inputData = req.body
        Branch.findByIdAndUpdate(id,{$set:inputData})
            .then(data=>{
                Branch.findById(data.id).then(newData=>{
                    res.json({data:newData})
                })
            })
            .catch(err=>{
                res.status(500).json({
                    message:'Something error found!',
                    error:err
                })
            })
    }
    //Delete data
    delete(req, res,next) {
        Branch.remove({
            _id: req.params.id
        }, function (err, result) {
            if (err)
                res.send(err)
            res.send({
                success: true
            })
        })
    }
    //Last serial
    serial(req,res,next){
        Branch.findOne({company_id:req.params.company_id})
            .sort('-serial_num')  // give me the max
            .select('serial_num')
            .exec(function (err, result) {
                if (err) return handleError(err);
                if(result==null){
                    res.json({
                        "serial":1
                    })
                }else{
                    res.json({
                        "serial":result.serial_num+1,
                    })
                }
            });
    }

}
module.exports = new BranchController;