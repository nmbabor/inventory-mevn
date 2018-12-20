const Permission = require('./Permission')

class PermissionController{

//View all Data
    index(req,res,next){
        Permission.find()
            .then(allData => {
                res.status(200).json(allData)
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
        Permission.findById(req.params.id).then(data => {
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
        input.slug = input.slug.replace('/*', '')
        input.slug = input.slug + ''
        if(input.type===1){
            input.methods = ["POST", "GET", "PUT","DELETE"]
        }else{
            input.methods = "*"
        }
        const role = new Permission(input)
        role.save().then(data=>{
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
        inputData.slug = inputData.slug.replace('/*', '')
        inputData.slug = inputData.slug + ''
        if(inputData.type===1){
            inputData.methods = ["POST", "GET", "PUT","DELETE"]
        }else{
            inputData.methods = "*"
        }
        Permission.findByIdAndUpdate(id,{$set:inputData})
            .then(data=>{
                Permission.findById(data.id).then(newData=>{
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
        Permission.remove({
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
module.exports = new PermissionController;