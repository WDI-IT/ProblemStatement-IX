const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const app = express();
const Products = require('./model/product');
const { findById } = require('./model/product');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.get('/',(req,res,next)=>{
  res.status(200).json({success:true});
});

app.get('/getproduct',async (req,res,next)=>{
  try{
    const products = await Products.find();
    if(!products){res.status(404).json({status:false,msg:'Not Found'})}
    res.status(200).json({products,success:true});
  }catch(err){
    res.status(505).json({status:false,msg:'error : '+err})
  }
});

app.post('/createproduct',async (req,res,next)=>{
  try{
    let title = req.body.title;
    let desc = req.body.desc;
    let imgsrc = req.body.imgsrc;
    let product = new Products({title,desc,imgsrc});
    const result = await product.save();
    if(!result){res.status(404).json({status:false,msg:'Data cant be stored!'})}
    res.status(200).json({success:true,result});
  }catch(err){
    res.status(505).json({status:false,msg:'error : '+err})
  }
});

app.post('/editproduct',async (req,res,next)=>{
  try{
    let title = req.body.title;
    let desc = req.body.desc;
    let imgsrc = req.body.imgsrc;
    let id = req.body.id;

    let product = await Products.findById(id);
    
    const result = await product.updateOne({
      title,desc,imgsrc
    });
    
    if(!result){res.status(404).json({status:false,msg:'Data cant be updated!'})}
    res.status(200).json({success:true});
  }catch(err){
    res.status(505).json({status:false,msg:'error : '+err})
  }
});

app.post('/deleteproduct',async (req,res,next)=>{
  try{
    let id = req.body.id;
    const product = await Products.findById(id);
    const result = await product.remove();
    if(!result){res.status(404).json({status:false,msg:'Data cant be deleted!'})}
    res.status(200).json({success:true});
  }catch(err){
    res.status(505).json({status:false,msg:'error : '+err})
  }
});

mongoose
  .connect(
    'mongodb+srv://root:root@cluster0-nk8bs.mongodb.net/problemstatement9?retryWrites=true&w=majority',
    {useNewUrlParser: true,useUnifiedTopology: true} 
  )
  .then(result => {
    const server = app.listen(5000);
  })
  .catch(err => {
    console.log(err);
});