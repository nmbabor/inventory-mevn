const mongoose = require('mongoose')
const Schema = mongoose.Schema
const newSchema = new Schema({
    group:{
        type:String,
        required:true,
        trim:true
    },permissions:{
        type:Array,
        required:true,
        default : []
    },
    created_at:{
        type: Date, default: Date.now
    },
    updated_at:{
        type: Date, default: Date.now
    }
})

const PermissionRole = mongoose.model('PermissionRole',newSchema)
module.exports = PermissionRole;
