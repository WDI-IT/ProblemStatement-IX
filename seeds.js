var mongoose = require("mongoose");
var Product = require("./models/products");


var data = [
    {
        name: "Apple", 
        image: "https://previews.123rf.com/images/mblach/mblach1209/mblach120900059/15423524-red-apple-with-leaf.jpg",
        price:"20",
        desc: "red, small"
    },
    {
        name: "Cake", 
        image: "https://cakewhiz.com/wp-content/uploads/2016/07/Brownie-Cake-Recipe.jpg",
        price:"250",
        desc: "brown, 1/2 kg"
    },
    {
        name: "Cat", 
        image: "https://news.cgtn.com/news/77416a4e3145544d326b544d354d444d3355444f31457a6333566d54/img/37d598e5a04344da81c76621ba273915/37d598e5a04344da81c76621ba273915.jpg",
        price:"1000",
        desc: "white, furry"
    },
    {
        name: "Pen", 
        image: "https://fontoplumo.nl/shop/6508-large_default/montblanc-george-gershwin-donation-pen-special-edition-ballpoint-pen.jpg",
        price:"10",
        desc: "blue"
    }
    

]

function seedDB(){
   //Remove all Products
   Product.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed Products!");
         //add a few Products
        data.forEach(function(seed){
            Product.create(seed, function(err, product){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a Product");
                    //create a comment
                }
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;