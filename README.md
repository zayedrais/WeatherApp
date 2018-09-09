<h2>BUILD A WEATHER WEBSITE WITH NODE.JS + EXPRESS + GOOGLEMAP + OPENWEATHER</h2>
In this tutorial you’ll learn, how to make call Google maps API to get the latitude and longitude of the city and pass to the Openweather API and display the current temperature of the city.

Here we are making a web app, where users can type in a city name and get real-time weather data instantly displayed on their screen.

Before going to this tutorial, we need pre-setup for the project build.

Live project Demo here <a href=https://weather-nodejs.herokuapp.com >Weather App </a>
<h3>Pre-Project Setup</h3>

Here’s what you’ll need:

  <li>  OpenWeatherMap.org account. It’s a quick signup.</li>
  <li>  Node.js: Visit the official Node.js website to download and install Node, if you haven’t already. If you want to know, what is a node, how to install, check here my previous post? Why Node.js is favourite among developers.
   </li> 
<h3>Step 1: OpenWeatherMap</h3>

if you want to play with APIs, OpenWeatherMap is a good place to start. They actually provide 11 different APIs all related to weather that you can access.

For this project, we are using the Free ‘Current Weather’ API. go to this link and sign up for an account.

Once signed in, select the API keys tab. Here you can Create a Key on the right-hand side of the page. Enter a name anything works and select Generate. Your API Key will appear on the left. Copy this key for later.

Now go to the API tab to know the details knowledge of API, and select API doc of the current weather data. and come to “By geographic coordinates” section, see once how API will show the data.
<h3>Step 2: Setting up the project</h3>

<li>Create an empty directory named WeatherApp and run: </li> 

<pre>npm init</pre>

<li>  Fill out the required information to initialize the project. </li> 
<li>  Create a file named app.js — this file will have the main code for our application. </li> 

Building the API call

To make our API call, we’ll be using a popular npm module called request. the request has millions of downloads and is a module that simplifies the code needed to make an HTTP request in a node.

Install request by running:

<pre>npm install request --save </pre>

Now have to install express npm module.

Express.js is a web application framework for Node.js. It provides various features that make web application development fast and easy.

<pre>npm install express --save</pre>

If you want to install the latest version of a module of npm.

<pre>npm install Modulename@VerionNo. --save </pre>

Create a new folder inside your project directory give a name as “geocode” and add filegecode.js and add below code here.
<pre>
const request = require('request'); 
var geocodeAddress =(address,callback) => {
var encodeAddress = encodeURIComponent(address); 
request ({
url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`, 
json:true 
},(error,response,body)=> {
if(error) 
{
callback('Unable to conncet google Servers');
}
else if(body.status === 'ZERO_RESULTS')
{
callback('Unable to find address');
}
else if(body.status === 'OK')
{
callback(undefined,{ 
address: body.results[0].formatted_address, 
latitude: body.results[0].geometry.location.lat, 
longitude: body.results[0].geometry.location.lng 
});
} 
}); 
} 
module.exports.getAddress = geocodeAddress;
</pre>

Create a new folder inside your project directory as “WeatherApi” and add file getWeather.jsfile and add below code here.
<pre>
////weather api call
const request =require('request'); 
var getWeather = (lat,lon,callback) => { 
request ({ 
url: ​https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=KEYID`, 
json: true
},(error,response,body)=>
{
 if(!error && response.statusCode === 200) 
{ 
callback(undefined,{ 
Temp: body.main.temp 
});
} 
else {
callback('unable to fetch weather'); 
} 
}); 
}; 
module.exports.getWeather = getWeather; 
////
</pre>
The above code has to paste your key which is copied from Openweather API key
<pre>
https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=KEYID
</pre>

and KEYID replaced by your API KeyID.

Now create a new folder for “view” to type the city name and get the current weather data and add file index.html and add below code here.
code be find in view folder index.html
For this project, we are using an AJAX post method to display the temperature of the city. create new folder “public “and add new folder JS and add new file name as postrequest.js. and add the below code here.
<pre>
$(document).ready(function () { 
// SUBMIT FORM 
$("#weatherForm").submit( (event) => {
// Prevent the form from submitting via the browser. 
event.preventDefault(); 
ajaxPost();
});
function ajaxPost() { 
// PREPARE FORM DATA
var formData = {
 cityname: $("#cityname").val(),
}
// DO POST 
$.ajax({
type: "POST",
 contentType: "application/json",
url: window.location + "api/customers/save",
data: JSON.stringify(formData),
dataType: 'json',
success: (output)=> { 
$("#postResultDiv").html("<p>" +
"<br>" +
"" + JSON.stringify(`<code> ${output.addname} </code> Current Tempeature is <code>${output.temp}<sup>o</sup>C </code>`) + "</p>"); 
},
error: (e) => {
alert("Error!"); 
console.log("ERROR: ", e); 
}
}); 
// Reset FormData after Posting 
resetData(); 
} 
function resetData() {
$("#citytname").val(""); 
}
})
</pre>
Run your code

Now app is ready for a run.

Type the below code for a run the app from project root directory
<pre>
node app.js
</pre>
Now open your browser and visit:- localhost:8081, type a city name into the field and hit submit! You would see the current temperature of the city.
<pre>
http://localhost:8081/
</pre>
App demo: Live <a href=https://weather-nodejs.herokuapp.com >Weather App site <a>
  <br>
Full tutorial in <a href=http://www.tecoquest.com/2018/09/08/build-a-weather-website-with-node-js-express-googlemap-openweather>Tecoquest</a>


 

