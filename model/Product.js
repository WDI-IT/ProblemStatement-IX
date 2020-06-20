//Products Model

const mongoose = require('mongoose');

let ProductSchema = new mongoose.Schema({
    
    ProductName: {
        type:String,
        required : true
        }
    ,

    ImageLink: {
        type:String,
        required : true}
        ,


    Description: {
        type :String,
        required : true}


});


New_Products= mongoose.model('Production',ProductSchema);

module.exports = New_Products;