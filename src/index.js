function displayWeatherCondition(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function getTemp(event) {
  event.preventDefault();
  let city = document.querySelector("#form-input").value;
  search(city);
}

function search(city) {
  let apiKey = "8c27e32a44363e7c302056624eb9fac6";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function searchGeo(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "6f1066b52fb74e7c4c41b08e58f115f4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getGeo() {
  navigator.geolocation.getCurrentPosition(searchGeo);
}

search("Madrid");

let searchC = document.querySelector("#search-form");
searchC.addEventListener("submit", getTemp);

let form = document.querySelector("button.btn-location");
form.addEventListener("click", getGeo);
