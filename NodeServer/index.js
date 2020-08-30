var express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 5000;
const hostname = "0.0.0.0";
// require("dotenv/config");
var productRouter = require("./routes/productRouter");
const url = process.env.URL;
const connect = mongoose.connect(url);
connect.then(
  (db) => {
    console.log("Connected successfully");
  },
  (err) => {
    console.log(err);
  }
);

var app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", productRouter);

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
