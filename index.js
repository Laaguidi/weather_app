//jshint esversion:6
const express = require("express");
//body-parser package: allow me to look at the body of the post request and fetch the data
const bodyParser = require("body-parser");
const https = require("https"); //the structure that allows us to get what we want from the data we have. you don't need to download this module to a native structure.Its'a native module.
//const bodyParser = require("body-parser");
//equire('dotenv').config(); //for security (api keys)

const app = express();
//for encoding data
app.use(bodyParser.urlencoded({extended:true})); // for using body-parser

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");

  });

app.post("/", function(req, res){
    //console.log("Received");
    const apiKey = "cc10c60fcbeb13be999bdc2c5abe05e6";
    const unit = "metric"
    const query = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey +"&units=" + unit;
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function (data){
            //console.log(data);
            //json.parse: unwrappe the file to give javascript object
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            //const feel = weatherData.main.feels_like;
            const weatherDescription = weatherData.weather[0].description; //weather is an array
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@4x.png";

            //res.send("The temperature in Lille is " + temp + " degrees celcius");
            res.write("<p> The weather is currently " + weatherDescription + "</p>")
            res.write("<h1>The temperature in " + query + " is " + temp +  " degrees Celcius.</h1>");
            res.write("<img src=" + imageUrl + ">");
            res.send();
        })
    })
})





app.listen(3000, () => {
    console.log("Server is running on port.");
  });