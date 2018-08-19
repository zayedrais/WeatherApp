const geocode = require('./geocode/geocode')
const getWeather = require('./WeatherApi/getWeather')
const port = process.env.PORT || 8081;
var express = require("express");
var app = express();

var router = express.Router();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.static('public'));

var path = __dirname + '/views/';

router.use(function (req, res, next) {
    console.log("/" + req.method);
    next();
});

var outputs =[];
app.get("/", function (req, res) {
    res.sendFile(path + "index.html");
});

app.post("/api/customers/save", function (req, res) {
    console.log('Post a Weather: ' + JSON.stringify(req.body));
    var cityAddress = req.body.cityname;
    //
      geocode.getAddress(cityAddress, (errorMessage, results) => {
          if (errorMessage) {
              console.log(errorMessage);
             return res.status(400).send(errorMessage);
          } else {
              var add = results.address;
              
              //Get Weather 
              getWeather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
                  if (errorMessage) {
                      console.log(errorMessage);
                      return res.status(400).send(errorMessage);
                  } else {
                      var TempCel = weatherResults.Temp - 273.15;
                      var Temperature = TempCel.toFixed(0);
                      var output = {};
                      output.temp = Temperature;
                      output.addname = add.replace(/ *\,[^,]*\ */g, "");
                        outputs.push(output);
                        console.log(output);
                      return res.status(200).send(output);
                  }
              });

          }
      });
});

app.use("/", router);

app.use("*", function (req, res) {
    res.sendFile(path + "404.html");
});

app.listen(port, function () {
    console.log(`Example app listening on port localhost: ${port} `);
})