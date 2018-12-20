const mongoose=require('mongoose')
const Schema=mongoose.Schema

const NewSchema=new Schema({
    type:{
        type:Number,
        required:true,
        trim:true,
        default:2
    },
    company_name:{
        type:String,
        required:true,
        trim:true,
    },
    address:{
        type:String,
        trim:true,
    },
    mobile:{
        type:String,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        trim:true,
        unique:true
    },
    logo:{
        type:String,
    },
    favicon:{
        type:String,
    }
})

const PimaryInfo=mongoose.model('PimaryInfo',NewSchema)
module.exports = PimaryInfo;