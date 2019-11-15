const express = require('express');
const BodyParser = require('body-parser');
const csv = require("fast-csv");
const ejs = require('ejs');
const fileUpload = require("express-fileupload");
const mongoose = require('mongoose');
const session = require('express-session');

//decaler express server
var app = express()
var server = require('http').createServer(app)
var db = mongoose.connect('mongodb://localhost:27017/cams') // fill this later

// fill the mongoose models here later


//set app and requirements
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(fileUpload);
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

app.get('/percent-etab', function (req, res) {
  var etabs = [];
  //get all the ids from the base 1
  Camions.find({}, function(error, camions) {
    camions.forEach(function (camion) {
      if (camion.Regat_etab not in etabs) etabs.push(camion.Regat_etab);
      etabs.forEach(function(etab) {
        Camions.find({Regat_etab: etab, /* join with collecte is not nulle},*/ function(TotalEtab) {
          Object.size = function(obj) {
            var size = 0, key;
            for (key in obj) {
              if (obj.hasOwnProperty(key)) size++;
            }
            return size;
          };
          var numberTotalEtab = TotalEtab.size;
          var numberLateEtab = 0;
          var sites = [];
          TotalEtab.forEach(function (etab) {
            if (tourn.ecart == "######") numberLateEtab += 1;
            if (etab.Regat_site not in sites) {
              sites.push(etab.Regat_site);
              TotalSite = TotalEtab.filter(element => element.Regat_site === etab.Regat_site)
            }
          });
          Retard.create({
            percent: (numberLate*100)/numberTotal
          });
        });
      });
    });
  });
});
// insert in percentage week auto increment, insert in site and number of tournées
//remove duplicates and store in new variable
//for each id in the list count how many times it's repeated(total)
//for each id look for tournées where Heure effective > Heure départ du camion and collecte is not null
//count number of tournées and find percentage
//insert

app.get('/bals', function (req, res) {
  //get tournées(join and get all fields from both models) where ecart negative and collecte is not null
  //insert into database
  //get from database
});

// updating the first databse
app.post('/upload-cam', function(req, res) {
  if (!req.body.files) return res.status(400).send('No files were uploaded.');
  var camionFile = req.body.file;
  var camions = [];
  csv
    .fromString(camionFile.data.toString(), {
      headers: true,
      ignoreEmpty: true
    })
  .on("data", function(data){
      camions.push(data);
      console.log(camions);
      console.log("=========================================");
      console.log(data);
    })
  .on("end", function(){
    Camions.create(camions, function(err, documents) {
      if (err) throw err;
    });
    res.send(camions.length + ' camions have been successfully uploaded.');
  });
});

// updating second database
app.post('/upload-cam', function(req, res) {
  if (!req.body.files) return res.status(400).send('No files were uploaded.');
  var balFile = req.body.file;
  var bals = [];
  csv
    .fromString(balFile.data.toString(), {
      headers: true,
      ignoreEmpty: true
    })
  .on("data", function(data){
      bals.push(data);
      console.log(bals);
      console.log("=========================================");
      console.log(data);
    })
  .on("end", function(){
    Bals.create(bals, function(err, documents) {
      if (err) throw err;
    });
    res.send(bals.length + ' bals have been successfully uploaded.');
  });
});



console.log("Listening on port 80")
app.listen(80)
