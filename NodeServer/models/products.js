var mongoose = require("mongoose");
var schema = mongoose.Schema;

var Product = new schema({
  name: {
    type: String,
    default: "",
  },
  imgurl: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  display: {
    type: String,
    default: "true",
  },
});

module.exports = mongoose.model("Product", Product);
