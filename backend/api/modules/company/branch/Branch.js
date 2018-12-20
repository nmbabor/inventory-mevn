const mongoose = require('mongoose')
const Schema = mongoose.Schema
const newSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String
    },
    status:{
        type:Number,
        required:true,
        default: 1
    },
    type:{
        type:Number,
        required:true,
        default: 1 // 1= branch, 2 = Franchise
    },
    serial_num:{
        type:Number,
        required:true
    },
    company_id:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'Company'
    },
    created_at:{
        type: Date, default: Date.now
    },
    updated_at:{
        type: Date, default: Date.now
    }
})

const Model = mongoose.model('Branch',newSchema)
module.exports = Model;
