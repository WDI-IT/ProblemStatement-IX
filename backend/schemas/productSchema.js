var mongoose = require('mongoose')
var Schema = mongoose.Schema

var productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    imgsrc: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model('Product', productSchema);