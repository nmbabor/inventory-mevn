const mongoose=require('mongoose')
const Schema=mongoose.Schema

const newSchema = new Schema ({
    company_name:{
        type:String,
        required:true,
        trim:true
    },
    address:{
        type:String,
        required:true,
    },
    mobile_no:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    shipping_address:{
        type:String,
        required:true,
        trim:true
    },
    logo:{
        type:String,
        required:false,
    },
    status:{
        type:Number,
        required:true,
        default: 1
    }
})

const Company = mongoose.model('Company',newSchema)
module.exports=Company