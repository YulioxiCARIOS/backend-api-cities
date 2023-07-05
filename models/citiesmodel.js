const mongoose=require ("mongoose")

const citieSchema=new mongoose.Schema({
    name:{type:String, required:true},
    country:{type:String, required:true},
    continent:{type:String, required:true},
    language:{type:String, required:true},
    description:{type:String, required:true},
    image:{type:String, required:true}
})

const Cities= mongoose.model("cities", citieSchema)
module.exports=Cities 