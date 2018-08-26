In this project are to know the current temperature of city.
we are using <b>googlemaps</b> and <b>openweathermap</b> API for get the current temperature of city.
<h1>GoogleMaps API</h1>
The google map api is to help to know the longitude and latitude of the cities.
Go to browser and open below metion link, give address to know the lat and lng.
https://maps.googleapis.com/maps/api/geocode/json?address=some address
The lat and lng output can be pass to the openweather API to get the current temperature of address.
<h1>Openweather API </h1>
~Before using the openweather API, First sign up the account on this link : https://openweathermap.org/api
~After register, go to API menu to subcribe the current weather data, then go to APP Key to get the APICODE
~Go to the weatherAPP/WeatherAPI/getWeather.js file to give the APPCODE which you got above.https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=Give your APPCode
~After change the APPCODE then save the project and go to current project directory in terminal run the 'node app.js'
~Open the http://localhost:8081 in browser 

