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

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "8c27e32a44363e7c302056624eb9fac6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
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
  // displayForecast();
  getForecast(response.data.coord);
}

function changeIcon() {
  let icon = document.querySelector("img.current-weather-icon");
  // let iconEl = response.data.weather[0].icon;
  let iconEl = `01n`;
  // icon.setAttribute("src", iconDictionary[iconEl]);
  icon.setAttribute("src", `img/${iconEl}.png`);
  // icon.setAttribute(
  //   "src",
  //   ` http://openweathermap.org/img/wn/${iconEl}@2x.png`
  // );

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

// <!--------------------------forecat-------------------------------!>

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  // console.log(response.data.daily[0].temp.max);
  let forecast = response.data.daily;
  // let tempMax = Math.round(response.data.daily[0].temp.max);
  // let tempMin = Math.round(response.data.daily[0].temp.min);
  // console.log(tempMin);
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        ` 
<div class="col-2">
<div class="weather-forecast" >${formatDay(forecastDay.dt)}</div>

<img
class="forecast-icon"
src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
alt=""
 />
<div class="weather-forecast">
<span class=weather-forecast-temp-max>${Math.round(
          forecastDay.temp.max
        )}º</span>
<span class=weather-forecast-temp-min>/ ${Math.round(
          forecastDay.temp.min
        )}º</span>
</div>
</div>`;
    }
  });

  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}
//==============
