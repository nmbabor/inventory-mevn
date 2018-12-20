const Area = require('./Area')

class AreaController{

//View all Data
    index(req,res,next){
        Area.find()
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
        Area.findById(req.params.id).then(data => {
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
        const module = new Area(input)
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

        Area.findByIdAndUpdate(id,{$set:inputData})
            .then(data=>{
                Area.findById(data.id).then(newData=>{
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
        Area.remove({
            _id: req.params.id
        }, function (err, result) {
            if (err)
                res.send(err)
            res.send({
                success: true
            })
        })
    }
    bulkStore(req,res,next){
        let input = req.body;
        Area.collection.insert(input, function (err, docs) {
            if (err){
                res.status(500).json({
                    message:'Some Error found!',
                    error:err
                })
            } else {
                res.status(201).json({
                    message:'Bulk Data successfully inserted.',
                })
            }
        });
    }
}
module.exports = new AreaController;