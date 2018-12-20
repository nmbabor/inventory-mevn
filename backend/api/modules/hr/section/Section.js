const mongoose = require('mongoose')
const Schema = mongoose.Schema
const newSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type:Number,
        required:true,
        default: 1
    }
})

const Module = mongoose.model('Section',newSchema)
module.exports = Module;
