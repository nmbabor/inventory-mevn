const mongoose = require('mongoose')
const Schema = mongoose.Schema
const newSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    methods:{
        type : Array ,
        required:true,
        default : []
    },
    status:{
        type:Number,
        required:true,
        default: 1
    },
    slug:String,
    type:{type:Number,default:1},
    created_at:{
        type: Date, default: Date.now
    },
    updated_at:{
        type: Date, default: Date.now
    }
})

const Permissions = mongoose.model('Permissions',newSchema)
module.exports = Permissions;
