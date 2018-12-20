const mongoose = require('mongoose')
const Schema = mongoose.Schema
const newSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    code:{
        type:String,
        required:false,
        trim:true,
        unique:true
    },
    details:{
        type:String,
        required:false
    },
    company_id:{
        type:Schema.Types.ObjectId,
        required:false,
        ref: 'Company'
    },
    category_id:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'Category'
    },
    unit_id:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'Units'
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

const Module = mongoose.model('Product',newSchema)
module.exports = Module;
