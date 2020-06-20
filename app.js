var express=require("express");
var mongoose=require("mongoose");
var passport=require("passport");
var bodyParser=require("body-parser");
var methodOverride=require("method-override");
var seedDB=require("./seeds");
seedDB();
//var User =require("./models/user");
var expressValidator = require("express-validator");
var path= require("path");
var LocalStrategy=require("passport-local").Strategy;
var passportLocalMongoose=require("passport-local-mongoose");
var config=require("./config/database");
var fileUpload=require("express-fileupload");
require('dotenv').config();
 
mongoose.connect(config.database,{ useNewUrlParser: true ,useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true});



var app=express();
app.set("views",path.join(__dirname + '/views'));
app.set("view engine","ejs");
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
    secret:"login to tutorweb",
    resave:true,
    saveUninitialized:true
}));
app.use(methodOverride("_method"));
//express validator
app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    var namespace = param.split('.')
      , root = namespace.shift()
      , formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  },
  customValidators: {
    isImage: function (value, filename) {
      var extension = (path.extname(filename)).toLowerCase();
      switch (extension) {
        case ".jpg":
          return ".jpg";
        case ".png":
          return ".png";
        case ".jpeg":
          return ".jpeg";
        default:
          return false;
      }
    }
  }
}));


//express messages
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use(passport.initialize());
app.use(passport.session());

/* passport.use(new LocalStrategy(User.authenticate()
  
  ));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
 */

 // set gobal variables
 app.locals.errors=null;

 app.use(fileUpload());

//set routes

var products=require("./routes/admin_product.js");
var  Product= require("./models/products");

app.use("/admin/products",products);

app.get("/",function(req,res){
  
  if (req.query.search) {
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');
  Product.find(
              { name: regex }, function (err, products) {
            if(err){
              console.log(err);
            }else{
              var noMatch;
              if(products.length<1){
                noMatch="No Products match the Query,please try another.";
              }
              res.render("explore", {products:products,noMatch:noMatch});}
          });
            
            
}else{
  var noMatch;
  Product.find(function(err, products){
       res.render('explore', {
        products: products,
        noMatch:noMatch
    });
  });

}
   });
           
  

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
app.listen(process.env.PORT || 5000,function(){
    console.log("server started");
});