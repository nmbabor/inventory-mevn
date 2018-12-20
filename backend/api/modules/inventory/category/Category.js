const mongoose = require('mongoose')
const Schema = mongoose.Schema
const newSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    details:{
        type:String,
        required:false
    },
    company_id:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'Company'
    },
    status:{
        type:Number,
        required:true,
        default: 1
    },
    created_by:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    created_at:{
        type: Date, default: Date.now
    },
    updated_at:{
        type: Date, default: Date.now
    }
})

const Module = mongoose.model('Category',newSchema)
module.exports = Module;
