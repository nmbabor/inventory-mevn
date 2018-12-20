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

const Module = mongoose.model('Unit',newSchema)
module.exports = Module;
