const mongoose = require('mongoose')
const Schema = mongoose.Schema
const newSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    url:{
        type:String,
        required:true,
        trim: true,
    },
    status:{
        type:Number,
        required:true,
        default: 1
    },
    serial_num:{
        type:Number,
        required:true
    },
    module_id:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'Module'
    },
    slug:{
        type : Array ,
        default : []
    },
    icon_class:String,
    created_at:{
        type: Date, default: Date.now
    },
    updated_at:{
        type: Date, default: Date.now
    }
})

const Menu = mongoose.model('Menu',newSchema)
module.exports = Menu;
