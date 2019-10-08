const express = require('express');
const BodyParser = require('body-parser');
const csv = require("csv");
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');

//decaler express server
var app = express()
var server = require('http').createServer(app)
//var db = mongoose.connect('') // fill this later

// fill the mongoose models here later


//set app and requirements
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(BodyParser.urlencoded());
app.use(BodyParser.json());
app.use(session({secret: 'covoiture'}));

var Camions = require("./models/camions");

// [Routes]

app.get('/', function (req, res) {
  res.render("index");
});

app.get('/admin', function (req, res) {
  res.render("admin");
});

app.post('/add-trn', function (req, res) {
  // import from excel file
});

app.get('/percent', function (req, res) {
  //get all the ids from the base 1
  Camions.find({}, function(error, camions) {
    camions.forEach(function (camion) {
      
    });
  });
  //remove duplicates and store in new variable
  //for each id in the list count how many times it's repeated(total)
  //for each id look for tournées where Heure effective > Heure départ du camion and collecte is not null
  //count number of tournées and find percentage
  //insert
});

app.get('/bals', function (req, res) {
  //get tournées(join and get all fields from both models) where ecart negative and collecte is not null
  //insert into database
  //get from database
});

app.get('/upload-cam', function (req, res) {
  res.render("addcam");
});

app.post('/upload-cam', function(req, res) {
  if (!req.files) return res.status(400).send('No files were uploaded.');
     
  var camionFile = req.files.file;
 
  var camions = [];
         
  csv
    .fromString(camionFile.data.toString(), {
      headers: true,
      ignoreEmpty: true
    })
  .on("data", function(data){
      camions.push(data);
    })
  .on("end", function(){
    Camions.create(camions, function(err, documents) {
      if (err) throw err;
    });
    res.send(authors.length + ' authors have been successfully uploaded.');
  });
});

app.listen(80)
