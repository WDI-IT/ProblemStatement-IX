var mongoose = require('mongoose')

var Schema = mongoose.Schema;


var u = new Schema({
    Name: String,
    imgsrc:String,
    description:String
});
module.exports = mongoose.model('Product', u);

