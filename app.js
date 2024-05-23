const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");

const app =  express();
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
  //console.log(req.body.cityName);
  //const url = "https://api.openweathermap.org/data/2.5/weather?lat=28.7&lon=77.1&units=metric&appid=c05323c63d3e3ef2e23f54186e803114";
  //above url in working

  const query=req.body.cityName
  const units="metric"
  const apikey="c05323c63d3e3ef2e23f54186e803114"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&units=" +units+ "&appid="+apikey;

  https.get(url, function(response){
    console.log(response.statusCode);

    // this code segment fetch data using URL
    response.on("data",function(data){
    const weatherData = JSON.parse(data);
    console.log(weatherData);

    const temp= weatherData.main.temp
    const dis=weatherData.weather[0].description
    console.log(temp);
    console.log(dis);

    const icon = weatherData.weather[0].icon ;
    const imgurl = "https://openweathermap.org/img/wn/"+ icon +"@2x.png"

    //res.send("<h1>Temperatue in London is " + temp + " Celcius</h1>")
    // use res.write command to send multiple line output
    res.write("<h1>Temperatue in " +query+ " is " + temp + " Celcius</h1>")
    res.write("<h3>Weather in " +query+ " is " + dis + "</h3>")
    res.write("<img src=" +imgurl+ ">")
    res.send()

  })
  })
  // We can have only one res.send command
  // res.send("Server is up and running");
})





app.listen(3000, function(){
  console.log("Server in running on 3000");
})
