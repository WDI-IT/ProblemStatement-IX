const express = require('express');
const router = express.Router();
let Product_Info = require('../model/Product');

router.post('/Create',(req,res)=>{
    let {Product_Name, Image_Link, Description  } = req.body;


let ProductData = new Product_Info({
                          ProductName : Product_Name,
                          ImageLink : Image_Link,
                          Description : Description,
                       
                        });


ProductData.save().then(result=>{
    ({
        ProductData:result
    });
    
   res.redirect('/List')

});
});


router.post('/Delete',(req,res)=>{
  
    let Product_ID =  req.body.ProductID;
   
    
        Product_Info.findByIdAndDelete({_id : Product_ID}, function (err) {
            if(err) console.log(err);

            res.redirect('/List')
          });
      
               
                });
 
                

router.post('/Edit',(req,res)=>{
    let Product_ID =  req.query.ProductID;
   

    Product_Info.findByIdAndUpdate({_id: Product_ID}, req.body, {new: true}, function (err, doc) {
        if(err) console.log(err);

        res.redirect('/List')
      });
  
    });


            


             
module.exports = router;