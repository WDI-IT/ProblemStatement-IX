const express = require('express');
const app = express();

const mongoose = require('mongoose');
const path = require('path');

const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const dotenv = require('dotenv');
dotenv.config({path : './config.env'});

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true,
    useFindAndModify: false
}) .then(con =>{
    console.log( 'DB Connection established.' );
});

mongoose.connection.on('error',err =>{
    console.log(`DB connection error: ${err.messaage}`);
});

const postRoutes = require('./routes/router');
const getRoutes = require('./routes/post');

app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));



app.use(methodOverride('_method'));

app.use(postRoutes);
app.use(getRoutes);


const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`listen on port : ${port}`)
});

