const express = require('express');
const app = express();
const multer = require('multer');

const mongodb = require('mongodb')
const mongo = mongodb.MongoClient;
const oid = mongodb.ObjectID;

// connect to the database
var client;
mongo.connect('mongodb+srv://webdt:8U636hTRGTs6GcP@cluster0-hmy57.mongodb.net/products?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    keepAlive: false
}, function (err, _client) {
    client = _client
})

app.use(express.static(__dirname + '/public/'));

app.get('/', function (req, res) {
    res.sendFile(__dirname+'/index.html')
})

app.post('/add', multer().array(), function (req, res) {
    if (client) {
        var db = client.db('products');
        db.collection('products').insertOne({
            "Name": req.body.name,
            "imgsrc": req.body.link,
            "description": req.body.des
        }).then(result => {
            res.send(result.insertedId);
        }).catch(e => {
            res.sendStatus(500)
        })
    } else {
        console.error(err)
        res.sendStatus(500)
    }
})

app.get('/get/:id', multer().array(), function (req, res) {
    var prodId = req.params.id;
    if (client) {
        var db = client.db('products');
        // send all the products in the array
        if (prodId === 'all') {
            db.collection('products').find({}).toArray(function (_err, result) {
                if (_err) {
                    res.sendStatus(404);
                } else {
                    res.send(result)
                }
            })
        } else {
            // send the product corresponsing to the product id
            db.collection('products').find({ '_id': new oid(prodId)}).toArray(function (_err, result) {
                if (_err) {
                    res.sendStatus(404);
                } else {
                    res.send(result)
                }
            })
        }
    } else {
        console.error(err)
        res.sendStatus(500)
    }
})

app.post('/change/:id', multer().array(), function (req, res) {
    var prodId = req.params.id;
    var db = client.db('products');
    db.collection('products').updateOne({ _id: new oid(prodId) }, {
        $set: {
            Name: req.body.name,
            imgsrc: req.body.link,
            description: req.body.des
        }
    }).then(result => {
        console.log(result);
        res.sendStatus(200)
    }).catch(e => {
        res.sendStatus(500)
    })
})

app.listen('8000', function () {
    console.log('Running')
})