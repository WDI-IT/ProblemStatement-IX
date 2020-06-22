var express = require('express');
var router = express.Router();
var axios=require('axios')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Products' });
});
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Products' });
});
router.get('/create', function(req, res, next) {
  res.render('create', {
    title: 'Products',
  });
});

router.get('/edit', function(req, res, next) {
  res.render('edit',{
    title: 'Products',
  });
});

router.get('/delete', function(req, res, next) {
  res.render('delete', {
    title: 'Products',
  });
});

router.get('/list',function(req, res, next) {
  
  res.render('list', {
    title: 'Products'
  });
});

module.exports = router;
