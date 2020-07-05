var today = moment().format("MMMM Do YYYY")

$("#searchBtn").click(function(){
  var searched = $("#searchBar").val()
  let newBtn = $("<button></button>").text(searched).addClass("btn btn-dark searched")
  $("#allsearches").prepend(newBtn)
  $("#allsearches").prepend("<br>")

  $("#searchedCity").text(searched + " (" + today + ")")
  callWeather(searched)
  fiveday(searched)

  console.log(searched)
})

function callWeather(city){
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=44c219ee8248f0b0fee5d4dab079b8ae"
  console.log(queryURL)
  
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var temp = (((response.main.temp) - 273.15) * (9/5) + 32).toFixed(1)
    $("#temp").text("Temperature: " + temp + "°F")

    var humidity = response.main.humidity
    $("#humidity").text("Humidity: " + humidity + "%")
    
    var wind = response.wind.speed
    $("#wind").text("Wind Speed: " + wind + "MPH")

    var lat = response.coord.lat
    var lon = response.coord.lon

    uv(lat, lon)
    
    console.log((response.weather[0].icon))
    var imageURL = "http://openweathermap.org/img/wn/" + (response.weather[0].icon) + "@2x.png"
    $("#today").attr("src", imageURL)

    console.log(response)
  });
}

//Find UV Index
function uv(lat, lon){
  var queryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=44c219ee8248f0b0fee5d4dab079b8ae"

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
    $("#uv").text("UV Index: " + response.value)
  });
}

//5 Day Forecast
function fiveday(searched){
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searched + "&appid=44c219ee8248f0b0fee5d4dab079b8ae"

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
    for(i=0; i < 5; i++){
      var temp = (((response.list[i].main.temp) - 273.15) * (9/5) + 32).toFixed(1)
      $("#temp" + i).text("Temperature: " + temp + "°F")
    }
    for(i=0; i < 5; i++){
      $("#humidity" + i).text("Humidity: " + (response.list[i].main.humidity) + "%")
    }
  });
}

//Repeat an Old Search
$("<button>").click(function(){
  var searched = $(this).val()
  console.log(searched)
})