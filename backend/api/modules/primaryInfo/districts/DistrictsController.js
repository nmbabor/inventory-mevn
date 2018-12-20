const District = require('./District')
const path=require('path')
const mongoose = require('mongoose')

class DistrictController{
    // all ranks -------------------list
    index(req,res,next){
        District.find()
            .then(ranks=>{
                res.status(200).json(ranks)
            })
            .catch(err=>{
                res.status(500).json(err)
            })

    }

    // save ranks info to database---------------------
    store(req,res,next){
        let input = req.body;
        const district = new District(input)
        district.save()
            .then(data=>{
                res.status(201).json(data)
            }).catch(err=>{
                res.status(500).json(err)
        })
    }

    //single user show
    show(req,res,next){

        District.findById(req.params.id).then(data => {
            res.status(200).json(data)
        }).catch(err => {
            res.status(500).json(err)
        })
    }
    // Update single data
    update (req,res,next) {
        let id = req.params.id
        let inputData = req.body;

        District.findByIdAndUpdate(id,{$set:inputData})
            .then(data=>{
                District.findById(data.id).then(newData=>{
                    res.json(newData)
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
    destroy(req, res,next) {
        District.findByIdAndRemove({
            _id: req.params.id
        }, function (err, result) {
            if (err)
                res.send(err)
            res.send({
                success: true
            })
        })
    }

    // active rank list -------------------------------
    activeDistricts (req, res,next) {
        District.find({ status: 1 })
            .then(result=>{
                res.status(200).json(result)
            })
            .catch(err=>{
                res.status(500).json(err)
            })
    }

    // bulk entry --------------------------
    bulkDistrictsSave(req,res,next){
        let districtes = req.body;
        let i=0
        let successMsg=[]
        for (i=0; i<districtes.length; i++){
            let districteData=new District(districtes[i])
            districteData.save()
                .then(ok=>{
                    successMsg=ok
                })
                .catch(err=>{
                    res.status(500).json(err)
                })
        }
        res.status(201).json({message:'All Distric Successfully Saved !'})
    }
}

module.exports = new DistrictController
