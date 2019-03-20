// server.js
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();
const multer = require('multer');

const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// for parsing multipart/form-data
app.use(multer().array()); 
app.use(express.static('public'));
const uri = "mongodb://dbadmin:ciafardonidbadmin@cluster0-shard-00-00-50cfv.mongodb.net:27017,cluster0-shard-00-01-50cfv.mongodb.net:27017,cluster0-shard-00-02-50cfv.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";

MongoClient.connect(uri, (err, database) => {
  if (err) return console.log(err)
  require('./app/routes')(app, database);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });               
})
