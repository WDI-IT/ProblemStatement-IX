const express= require('express')
const router= express.Router()
const adminController=require('../controllers/admin')

router.get('/create-product',adminController.getCreateProduct)
router.post('/create-product',adminController.postCreateProduct)

router.get('/edit-product',adminController.getEditProduct)
router.post('/edit-product',adminController.postEditProduct)

router.get('/delete-input' ,adminController.getInput)
router.post('/delete-product',adminController.postDeleteProduct);

module.exports=router