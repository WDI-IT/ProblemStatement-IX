var mongoose=require("mongoose");

var ProductSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String
    }
});



var Product=module.exports=mongoose.model("Product",ProductSchema);