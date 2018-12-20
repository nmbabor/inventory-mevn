const mongoose=require('mongoose')
const Schema=mongoose.Schema

const newSchema = new Schema ({
    name:{
        type:String,
        required:true,
        trim:true
    },
    details:{
        type:String,
        required:true,
    },
    company_id:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'Company'
    },
    branch_id:{
        type:Schema.Types.ObjectId,
        required:false,
        ref: 'Branch'
    },
    area_id:{
        type:Schema.Types.ObjectId,
        required:false,
        ref: 'Area'
    },
    type:{
        type:Number,
        required:true,
        //1 = Central Depot, 2 = Area Depot, 3 = Branch Depot
    },
    status:{
        type:Number,
        required:true,
        default: 1
    },
    created_at:{
        type: Date, default: Date.now
    },
    created_by:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    updated_at:{
        type: Date, default: Date.now
    }
})

const Model = mongoose.model('Depot',newSchema)
module.exports=Model