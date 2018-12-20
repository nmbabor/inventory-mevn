const mongoose = require('mongoose')
const Schema = mongoose.Schema
const newSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    vendor_id:{
        type:String,
        required:false,
        trim:true,
        unique:true
    },
    details:{
        type:String,
        required:false
    },
    address:{
        type:String,
        required:false
    },
    mobile:{
        type:String,
        required:true
    },
    additional_mobile:{
        type:String,
        required:false
    },
    logo:String,
    photo:String,
    nid:String,
    vat_no:String,
    trade_licence_no:String,
    e_tin:String,
    bank_name:String,
    bank_account:String,
    bank_branch:String,
    passport_number:String,
    representative_name:{
        type:String,
        required:false
    },
    company_id:{
        type:Schema.Types.ObjectId,
        required:false,
        ref: 'Company'
    },
    type:{
        type:Number,
        required:true,
        default: 1 //1= Company, 2=Person
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

const Module = mongoose.model('Vendor',newSchema)
module.exports = Module;
