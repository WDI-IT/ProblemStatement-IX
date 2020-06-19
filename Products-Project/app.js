//////////////////////********requiring packages*************/////////////////
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
//////////////////////********connecting to mongoDB*************/////////////////
mongoose.connect("mongodb+srv://abhishekpal463:Abhipal123@cluster0-wlpqz.mongodb.net/ProductDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//////////////////////********constructing mongo schema*************/////////////////
const productSchema = new mongoose.Schema({
  name: String,
  link: String,
  description: String
});

const Product = mongoose.model("Product", productSchema);
let productDetails = [];

Product.find(function(err,products){
  if(err){
    console.log(err);
  }else{
    products.forEach(function(product){
      productDetails.push({
        id:product._id,
        name:product.name,
        link:product.link,
        desc:product.description
      });
    });
  }
});

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.get("/contact", function(req, res) {
  res.render("contact");
});

app.get("/create", function(req, res) {
  res.render("create");
});

app.get("/edit", function(req, res) {
  res.render("edit");
});

app.get("/delete", function(req, res) {
  res.render("delete");
});

//////////////////////********showing products*************/////////////////
app.get("/show", function(req, res) {

      res.render("show", {
        products: productDetails
      });

});

//////////////////////********creating product*************/////////////////
app.post("/create", function(req, res) {
  const product = new Product({
    name: req.body.productName,
    link: req.body.productLink,
    description: req.body.productDescription
  });
  product.save(function(err) {
    if (err) {
      const result="Something went wrong, Try Again!!."
      res.render("result",{result:result});
    } else {
      productDetails.push({
        id: product._id,
        name: product.name,
        link: product.link,
        desc: product.description
      });
      const result="Product created successfully."
      res.render("result",{result:result});
    }
  });
});

//////////////////////********editing product*************/////////////////
app.post("/edit", function(req, res) {

  Product.updateOne({
      _id: req.body.productID
    }, {
      name: req.body.productName,
      link: req.body.productLink,
      description: req.body.productDescription
    },
    function(err) {
      if (err) {
        const result="Product doesn't Exist!"
        res.render("result",{result:result});
      } else {
        for(let x=0;x<productDetails.length;x++){
          if(productDetails[x].id==req.body.productID){
            productDetails[x].name=req.body.productName;
            productDetails[x].link=req.body.productLink;
            productDetails[x].desc=req.body.productDescription;
            break;
          }
        }
        const result="Product updated successfully."
        res.render("result",{result:result});
      }
    });
});

//////////////////////********deleteing product*************/////////////////
app.post("/delete", function(req, res) {
      Product.findOne({_id:req.body.productID},function(err,product){
        if(product){
          for(let i=0;i<productDetails.length;i++){
            if(productDetails[i].id==req.body.productID){
              productDetails.splice(i,1);
              const result="Product deleted successfully."
              res.render("result",{result:result});
            }
        }
      }else{
        const result="Product doesn't Exist!"
        res.render("result",{result:result});
      }
    });
});
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("Server started");
});
