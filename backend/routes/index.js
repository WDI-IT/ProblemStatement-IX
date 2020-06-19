var express = require('express');
var router = express.Router();
var cors = require('cors')

router.get('/', cors(), function (req, res, next) {
  res.json({ title: 'Express' });
});

module.exports = router;
