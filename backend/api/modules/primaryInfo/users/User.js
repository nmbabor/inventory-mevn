const mongoose = require('mongoose')
const Schema = mongoose.Schema
const valid = require('validator')

let newSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim: true,
        minLength:5,
        unique:true,
        index:true,
        validate:{
            validator: (v)=>{
                return valid.isEmail(v)
            },
            message:`{VALUE} is not valid`
        }
    },
    password:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
        trim: true,
        minLength:5,
        unique:true,
        index:true,
    },
    address:String,
    status:{
        type:Number,
        required:true,
        default: 1
    },
    role:{
        type:String,
        required:true
    },
    company_id:{
        type:Schema.Types.ObjectId,
        ref: 'Company'
    },
    created_by:{
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    branch_id:{
        type:Schema.Types.ObjectId,
        ref: 'Branch',
        required:false
    }
})

const Model = mongoose.model('User',newSchema)
module.exports = Model