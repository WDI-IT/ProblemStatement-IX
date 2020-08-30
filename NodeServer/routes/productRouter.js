const express = require("express");
const bodyparser = require("body-parser");
const productRouter = express.Router();

productRouter.use(bodyparser.json());
const Products = require("../models/products");

productRouter
  .route("/")
  .get((req, res, next) => {
    Products.find({ display: "true" })
      .then(
        (products) => {
          res.statusCode = 200;
          res.setHeader("Contebt-Type", "application/json");
          res.json(products);
        },
        (err) => {
          console.next(err);
        }
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Products.create(req.body)
      .then(
        (product) => {
          console.log("Product ceated", product);
          res.statusCode = 200;
          res.setHeader("Contebt-Type", "application/json");
          res.json(product);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /");
  })
  .delete((req, res, next) => {
    res.statusCode = 403;
    res.end("Delete operation not supported on /");
  });

productRouter
  .route("/:productId")
  .get((req, res, next) => {
    Products.findById(req.params.productId)
      .then(
        (product) => {
          res.statusCode = 200;
          res.setHeader("Contebt-Type", "application/json");
          res.json(product);
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => next(err));
  })

  .post((res, req, next) => {
    res.statusCode = 403;
    res.end("post operation not supported on/:productId");
  })
  .patch((req, res, next) => {
    Products.findByIdAndUpdate(
      req.params.productId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then(
        (product) => {
          res.statusCode = 200;
          res.setHeader("Contebt-Type", "application/json");
          res.json(product);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Products.findByIdAndUpdate(
      req.params.productId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then(
        (product) => {
          res.statusCode = 200;
          res.setHeader("Contebt-Type", "application/json");
          res.json(product);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

module.exports = productRouter;
