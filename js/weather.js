$(document).ready(function(){
  var lat;
  var long;
  
  $.getJSON("http://ip-api.com/json", function(data2){
    lat = data2.lat;
    long = data2.lon;
    
    if ((long == NaN && lat == NaN) || (long == undefined && lat == undefined)){
  $("#city").html("Your browser is incompatible.").css("background", "rgba(226, 46, 46, 0.9)");
      $("#fTemp").hide();
      $("#windSpeed").hide();
      $("#wType").hide();
    } else {
    
  var api = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&appid=98a16fbf7a22c4829057b8e091eaa83d";
  
  $.getJSON(api, function(data){
      var fTemp;
      var kTemp;
      var cTemp;
      var tempSwap;
    
   var weatherType = data.weather[0].description;
   var weatherIcon = data.weather[0].icon;
     kTemp = data.main.temp;
   var windSpeed = data.wind.speed;
   var city = data.name;
    
    fTemp = ((kTemp)*(9/5)-459.67).toFixed(0);
    cTemp = (kTemp - 273).toFixed(0);

    $("#city").html(city);
    $("#fTemp").html(fTemp + " &#8457;");
    $("#fTemp").click(function(){
      
       if (tempSwap===false){
         $("#fTemp").html(fTemp + " &#8457;");
         tempSwap = true;
         
       } else {
         $("#fTemp").html(cTemp + " &#8451;");
         tempSwap = false;
       }                
      });
    
    $("#windSpeed").html(windSpeed + " KM/h <img id='wind' src='https://cdn1.iconfinder.com/data/icons/weather-18/512/wind_storm-512.png'>");
    $("#wType").html(weatherType +' <img src="http://openweathermap.org/img/w/'+ weatherIcon +'.png">');
    $("#api").html(api);
  });
  }
 });
});
