const express=require('express')
const path = require('path');
const helmet=require('helmet')
const mongoose=require('mongoose')
const bodyParser = require('body-parser');
const app=express()

const URI='mongodb+srv://owner:downer@cluster0-icfip.mongodb.net/products?retryWrites=true&w=majority'

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(shopRoutes)
app.use('/admin',adminRoutes)


mongoose
  .connect(URI)
  .then(result => {
    app.listen(process.env.PORT || 5000);
  })
  .catch(err => {
    console.log(err);
  });