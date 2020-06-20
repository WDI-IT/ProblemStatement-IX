const express = require('express');
const router = express.Router();
const Products = require('../model/Product');



router.get('/Products',(req,res)=>{
    res.render('Products');
});

router.get('/Create',(req,res)=>{
    res.render('Create');
});

router.get('/Delete',(req,res)=>{
    res.render('Delete');
});

router.get('/Edit',(req,res)=>{
    res.render('Edit');
});

router.get('/List',(req,res)=>{
    Products.find({}).exec((err,products)=>{
        if(err) throw err;
    res.render('List',{"products": products});
});
});

router.get('/',(req,res)=>{
    res.redirect('/Products');
});




module.exports = router;