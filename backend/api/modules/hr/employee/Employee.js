const mongoose = require('mongoose')
const Schema = mongoose.Schema
const newSchema = new Schema({
    photo:{
        type:String,
    },
    employee_id:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    gender:String,
    nid:String,
    dob:{type: Date},
    doj_in_po:{type: Date},
    blood_group:String,
    religion: { type: String},
    father_name: { type: String},
    mother_name: { type: String},
    passport_number:String,
    etin_number:String,
    basic_pay:Number,
    house_rent:Number,
    medical_allowance:Number,
    designation_id:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'Designation'
    },
    section_id:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'Section'
    },
    user_id:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    status:{
        type:Number,
        required:true,
        default: 1
    },
    created_at:{
        type: Date, default: Date.now
    },
    updated_at:{
        type: Date, default: Date.now
    }
})

const Module = mongoose.model('Employee',newSchema)
module.exports = Module;
