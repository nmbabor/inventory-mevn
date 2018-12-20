const Menu = require('./Menu')
const Module = require('./Module')

class MenuController{

//View all Data
    index(req,res,next){

        Module.findById(req.params.module_id).then(module=>{
            Menu.find({module_id: req.params.module_id})
                .then(allData => {
                    res.status(200).json({
                        module,
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
                message:'Module not found!',
                error:error
            })
        })

    }
//single user show
    show(req,res,next){
        Menu.findById(req.params.id).then(data => {
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
        let module_id = req.params.module_id
        let inputData = req.body;
        inputData.module_id = module_id
        const menu = new Menu(inputData)
        menu.save().then(data=>{
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
        let inputData = {
            name: req.body.name,
            url: req.body.url,
            status: req.body.status,
            type: req.body.type,
            serial_num: req.body.serial_num,
            slug: req.body.slug,
            icon_class: req.body.icon_class,
        }
        Menu.findByIdAndUpdate(id,{$set:inputData})
            .then(data=>{
                Menu.findById(data.id).then(newData=>{
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
        Menu.remove({
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
        Menu.findOne({module_id:req.params.module_id})
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
module.exports = new MenuController;