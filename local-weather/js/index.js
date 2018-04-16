var city;
var temp;
var imgUrl;

$(document).ready(function() {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getLocation);
  } else {
    $('#error').text('Geolocation not enabled, this page will not function properly');
  }
  
  $('#convert').on("click", tempSwitch);
});

function getLocation(location) {
  var url = "https://fcc-weather-api.glitch.me/api/current?lat="+location.coords.latitude+"&lon="+location.coords.longitude;
  $.getJSON(url, function(json){
    city = json.name;
    temp = Math.round(json.main.temp);
    imgUrl = json.weather[0].icon;
    $('#city').text('City: ' + city);
    $('#temperature').text('Temperature: ' + temp);
    $('#temperature').addClass("celsius");
    $('#pic').attr("src", imgUrl);
  });
}

function tempSwitch() {
    if($('#convert').text() === "Switch to: Farenheight") {
    $('#convert').text("Switch to: Celsius");
    $('#temperature').removeClass('celsius');
    $('#temperature').addClass('farenheight');
    temp = toFarenheight(temp);
    $('#temperature').text('Temperature: ' + temp);
    } else {
    $('#convert').text("Switch to: Farenheight");
    $('#temperature').removeClass('farenheight');
    $('#temperature').addClass('celsius');
    temp = toCelsius(temp);
    $('#temperature').text('Temperature: ' + temp);
  }
}

function toFarenheight(temp) {
  return Math.round((9/5)*temp+32);
}

function toCelsius(temp) {
  return Math.round((5/9)*(temp-32));
}