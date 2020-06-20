var express=require("express");
var router =express.Router();
var mkdirp=require("mkdirp");
var fs=require("fs-extra");
var resizeImg=require("resize-img");

var  Product= require("../models/products");


router.get('/', function(req,res){
     
    var count;
    
    Product.find(function(err, products){
        if(products.length<1){
                count="There are no product yet.";
              }
       res.render('admin/products', {
        products: products,
        count : count
    });
    
   });
      
});

router.get("/add_product",function(req,res){
    
        res.render("admin/add_products");
    });
    


router.post('/add_product',function(req,res){

    req.checkBody('name','name must have value').notEmpty();
    req.checkBody('desc','Description must have value').notEmpty();
    req.checkBody('price','Price must have value').notEmpty();
    

    var name = req.body.name;
    var desc = req.body.desc;
    var price = req.body.price;
    var image=req.body.image;


    var errors = req.validationErrors();
    if(errors)
    {
            res.render('admin/add_products', {
                errors : errors,
                name : name,
                desc : desc,
                price: price,image:image
            });
          

    } else{ 
        Product.findOne({name : name}, function(err,product){


            if (product){
               req.flash('danger', ' This Product name already exists, choose another!!' );
               
            
            } else {
                

                var product = new Product({
 
                   name: name,
                   
                   desc : desc,
                   price: price,
                   
                   image: image
                   
                });
                product.save(function(err){

                if (err) 
                return console.log(err);

              

                 req.flash('succes', 'product added!!');
                 res.redirect('/admin/products');
                });
            }
        }); 
    }

    
}); 



router.get("/edit_product/:id", function (req, res) {

    Product.findById(req.params.id, function (err, product) {
        if (err)
            {return conslog.log(err);}

else{
        
    res.render("admin/edit_profile", {
        id:product._id,
        name:product.name,desc:product.desc,price:product.price,image:product.image
    });
}
    
});
});


router.post("/edit_product/:id", function (req, res) {
    

    
    req.checkBody('name','name must have value').notEmpty();
    req.checkBody('desc','Description must have value').notEmpty();
    req.checkBody('price','Price must have value').notEmpty();
    

    var name = req.body.name;
    var desc = req.body.desc;
    var price = req.body.price;
    var image=req.body.image;
    
    


    var errors = req.validationErrors();
    if(errors)
    {
            res.render('admin/edit_product', {
                errors : errors,
                name : name,
                desc : desc,
                price: price,
                image:image
            });
          

    } else{ 
        Product.findOne({name : name}, function(err,product){
            if (product){
               req.flash('danger', ' This Product name already exists, choose another!!' );
              }else{

                var newData = {name:name, image: image, desc: desc,price:price};
    Product.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, campground){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/admin/products");
        }
    });
                
            }
       
    });
    }

    
}); 


router.get("/delete_product/:id", function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {

        if (err)
            return console.log(err);
        req.flash("success", "product deleted");
        res.redirect("/admin/products");

    });
});



//Exports
module.exports = router;