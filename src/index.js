function formatData(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayWeatherCondition(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector(
    "#humidity"
  ).innerHTML = ` ${response.data.main.humidity}`;
  document.querySelector("#wind").innerHTML = ` ${Math.round(
    response.data.wind.speed
  )}`;
  let dataElement = document.querySelector("#currentDate");
  dataElement.innerHTML = formatData(response.data.dt * 1000);
  // document.querySelector("#uv").innerHTML = response.data;
}

function changeIcon(response) {
  let icon = document.querySelector("img.current-weather-icon");
  let iconEl = response.data.weather[0].icon;
  // let iconEl = `50d`;
  // icon.setAttribute("src", iconDictionary[iconEl]);
  // icon.setAttribute("src", `img/${iconEl}.png`);
  icon.setAttribute(
    "src",
    ` http://openweathermap.org/img/wn/${iconEl}@2x.png`
  );

  console.log(iconEl);
}

function getTemp(event) {
  event.preventDefault();
  let city = document.querySelector("#form-input").value;
  search(city);
}

// let iconDictionary = {
//   "01d": "img/5.svg",
//   "02d": "moon.svg",
//   "03d": "img/fog.svg",
//   "04d": "img/fog.svg",
//   "10d": "img/fog.svg",
//   "11d": "img/fog.svg",
//   "13d": "img/fog.svg",
//   "50d": "img/fog.svg",
//   "02d": "img/fog.svg",
//   "01n": "img/5.svg",
//   "02n": "img/fog.svg",
//   "03n": "img/fog.svg",
//   "04n": "img/fog.svg",
//   "10n": "img/fog.svg",
//   "11n": "img/fog.svg",
//   "13n": "img/fog.svg",
//   "50n": "img/fog.svg",
//   "02n": "img/fog.svg",
// };
function search(city) {
  let apiKey = "8c27e32a44363e7c302056624eb9fac6";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
  axios.get(apiUrl).then(changeIcon);
}

function searchGeo(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "6f1066b52fb74e7c4c41b08e58f115f4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
  axios.get(apiUrl).then(changeIcon);
}

function getGeo() {
  navigator.geolocation.getCurrentPosition(searchGeo);
}

search("Madrid");

let searchC = document.querySelector("#search-form");
searchC.addEventListener("submit", getTemp);

let form = document.querySelector("button.btn-location");
form.addEventListener("click", getGeo);

function convertToCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = 22;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  let temperature = tempElement.innerHTML;
  temperature = Number(temperature);
  tempElement.innerHTML = Math.round(temperature * 1.8 + 32);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

//==============
