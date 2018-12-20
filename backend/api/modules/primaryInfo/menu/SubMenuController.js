const Menu = require('./Menu')
const SubMenu = require('./SubMenu')

class SubMenuController{

//View all Data
    index(req,res,next){

        Menu.findById(req.params.menu_id).then(menu=>{
            SubMenu.find({menu_id: req.params.menu_id})
                .then(allData => {
                    res.status(200).json({
                        menu,
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
                message:'Menu not found!',
                error:error
            })
        })
    }

//single user show
    show(req,res,next){
        SubMenu.findById(req.params.id).then(data => {
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
        let menu_id = req.params.menu_id
        let inputData = req.body;
        inputData.menu_id = menu_id
        const subMenu = new SubMenu(inputData)
        subMenu.save().then(data=>{
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
        SubMenu.findByIdAndUpdate(id,{$set:inputData})
            .then(data=>{
                SubMenu.findById(data.id).then(newData=>{
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
        SubMenu.remove({
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
        SubMenu.findOne({menu_id:req.params.menu_id})
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
module.exports = new SubMenuController;