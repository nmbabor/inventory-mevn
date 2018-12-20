const Module = require('./Module')
const Permission = require('../acl/Permission')

class ModuleController{

//View all Data
    index(req,res,next){
        Module.find()
            .then(allData => {
                res.status(200).json({
                    allData
                })
            })
            .catch(err => {
                res.status(500).json({
                    message:'Some Error found!',
                    error:err
                })
            })
    }
//single user show
    show(req,res,next){
        Module.findById(req.params.id).then(data => {
            res.status(200).json(data)
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
        let input = req.body;
        const module = new Module(input)
        module.save().then(data=>{
            res.status(201).json({
                message:'Data successfully inserted.',
                result:data
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
        let inputData = req.body;

        Module.findByIdAndUpdate(id,{$set:inputData})
            .then(data=>{
                Module.findById(data.id).then(newData=>{
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
        Module.remove({
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
        Module.findOne()
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
   async permissions(req,res,next){
        let permissions = await Permission.find({status:1},"slug")
       let i = 0;
       let perm = [];
       for(i=0;i<permissions.length;i++){
           perm.push(permissions[i].slug)
       }
       res.json(perm)
    }
}
module.exports = new ModuleController;