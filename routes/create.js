var express = require('express');
var router = express.Router();
var mongoose=require('mongoose')
var mongoUrl="mongodb://amy:amy@cluster0-shard-00-00-iv7f7.mongodb.net:27017,cluster0-shard-00-01-iv7f7.mongodb.net:27017,cluster0-shard-00-02-iv7f7.mongodb.net:27017/Products?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"


let Product = require('../product');
router.post('/', async function(req, res, next) {
            console.log(req.body);
            var con = await mongoose.connect(mongoUrl,{
                useNewUrlParser: true, useUnifiedTopology: 
                true
            })


            const product = new Product({
                _id: new mongoose.Types.ObjectId(),
                Name: req.body.name,
                imgsrc:req.body.imgsrc,
                description:req.body.description
            });
            product.save().then(result => {
            res.status(201).json({
                message: "Product registered successfully!"
                })
            }).catch(err => {
            console.log(err),
            res.status(500).json({
            error: err
            });
            })
  
  });

  module.exports = router;