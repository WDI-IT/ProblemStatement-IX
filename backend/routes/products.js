var express = require('express');
var productRouter = express.Router();
var Product = require('../schemas/productSchema')
var cors = require('cors')

productRouter.route('/')
  .options(cors(), (req, res) => { res.senStatus(200); })
  .get(cors(), function (req, res, next) {
    Product.find({})
      .then(products => {
        console.log(products);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(products)
      }, err => next(err))
      .catch(err => console.log(err))
  })

  .post(cors(), function (req, res, next) {
    Product.create(req.body)
      .then(product => {
        console.log(product);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(product)
      }, err => next(err))
      .catch(err => console.log(err))
  })

productRouter.route('/:productID')
  .options(cors(), (req, res) => { res.senStatus(200); })
  .get(cors(), function (req, res, next) {
    Product.findById(req.params.productID)
      .then(product => {
        console.log(product);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(product)
      }, err => next(err))
      .catch(err => console.log(err))
  })
  .put(cors(), function (req, res, next) {
    Product.findByIdAndUpdate(req.params.productID, { $set: req.body }, { new: true })
      .then(product => {
        console.log(product);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(product)
      }, err => next(err))
      .catch(err => console.log(err))
  })

module.exports = productRouter;
