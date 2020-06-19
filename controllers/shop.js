const Product =require('../modal/products')
const mongoose = require('mongoose');

exports.getPage=(req,res,next)=>{
    res.render('index')
}

exports.getProducts = (req, res, next) => {
    Product.find()
      .then(products => {
        // console.log(products);
        res.render('allProducts', {
          prods: products
        });
      })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  };