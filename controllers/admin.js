const Product =require('../modal/products')

exports.getCreateProduct=(req,res,next)=>{
  res.render('create-product',{
    editing:false
  })
}
exports.postCreateProduct=(req,res,next)=>{
    const title = req.body.title;
    const image = req.body.image;
    const price = req.body.price;
    const description = req.body.description;

    const product=new Product({
        title: title,
        price: price,
        description: description,
        imageUrl: image,
    })
    product.save()
    .then(result=>{
        res.redirect('/')
    })
    .catch(err=>{
        console.log(err)
    })
}

exports.getInput=(req,res)=>{
    res.render('deleteProduct')
}
exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
      .then(product => {
        if (!product) {
          return next(new Error('Product not found.'));
        }
        return Product.deleteOne({ _id: prodId });
      })
      .then(() => {
        console.log('DESTROYED PRODUCT');
        res.redirect('/products');
      })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  };

  exports.getEditInput=(req,res)=>{
    res.render('editProduct')
  }

  exports.getEditProduct = (req, res, next) => {
    res.render('editProduct')
  };

  
  exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const image = req.body.image;
    const updatedDesc = req.body.description;
    console.log(prodId)
    console.log(updatedPrice)
    Product.findById(prodId)
      .then(product => {
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.description = updatedDesc;
        product.image=image
        return product.save()
        .then(result => {
          console.log('UPDATED PRODUCT!');
          res.redirect('/products');
        });
      })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  };
  
  