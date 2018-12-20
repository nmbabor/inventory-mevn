const mongoose=require('mongoose')
const Schema=mongoose.Schema

const DistrictSchema=new Schema({
    district:{type:String,required:true},
    details:{type:String},
    status:{type:Number, required:true, default: 1},
    created_at:{type: Date, default: Date.now},
    updated_at:{type: Date, default: Date.now}
})

const District = mongoose.model('District',DistrictSchema)
module.exports=District