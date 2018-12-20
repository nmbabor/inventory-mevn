const PrimaryInfo=require('./PrimaryInfo')
const fileUpload = require('express-fileupload');
const path=require('path')
class PrimaryInfoController{
// save primary info data -----------------
    store(req,res,next){
        PrimaryInfo.findOne()
            .then(result=>{
                if (result!== null && result !== ''){
                    res.status(200).json({
                        message:'Primary Info Already Appeared'
                    })
                }else {
                    let data=req.body
                    const infoData= new PrimaryInfo(data)
                    infoData.save()
                        .then(success=>{
                            res.status(200).json(success)
                        })
                        .catch(err=>{
                            res.status(500).json(err)
                        })
                }
            })
            .catch(err=>{
                res.status(500).json(err)
            })

    }

    // update primary info data -----------------
    update(req,res,next){
        PrimaryInfo.findOne()
            .then(result=>{
                if (result!== null && result !== ''){
                    let newData=req.body
                    // file upload ------------------------
                    let logoPath=''
                    if (req.files!==null && req.files.logo!==null){
                        let file=req.files.logo
                        let logoName='logo.png'

                        let dirName='upload/images/logo/'
                         logoPath='images/logo/'+logoName
                        file.mv(dirName+logoName, err=>{
                            if (err){
                               console.log('Error found to upload image')
                            }else {
                              console.log('Image Uploaded')
                            }
                        })
                        newData.logo=logoPath
                    }
                    let favPath=''
                    if (req.files!==null && req.files.favicon!==null){
                        let file=req.files.favicon
                        let favName='favicon.png'
                        let dirName='upload/images/logo/'
                         favPath='images/logo/'+favName
                        file.mv(dirName+favName, err=>{
                            if (err){
                               console.log('Error found to upload image')
                            }else {
                              console.log('Image Uploaded')
                            }
                        })
                        newData.favicon=favPath
                    }
                    // end file upload -----------------------------

                    PrimaryInfo.findOneAndUpdate(result._id,{$set: newData})
                        .then(
                            res.status(200).json(newData)
                        )
                        .catch(err=>{
                            res.status(500).json(console.log('update error'))
                        })

                }else {
                    let data=req.body
                    const infoData= new PrimaryInfo(data)
                    infoData.save()
                        .then(success=>{
                            res.status(200).json(success)
                        })
                        .catch(err=>{
                            res.status(500).json(err)
                        })
                }
            })
            .catch(err=>{
                res.status(500).json(console.log('last error catch'+err))
            })
    }

    // get one info --------------
    edit(req,res,next){
        PrimaryInfo.findOne()
            .then(info=>{
                res.status(200).json(info)
            })
            .catch(err=>{
                res.status(500).json(err)
            })
    }
}

module.exports = new PrimaryInfoController