// Format date for secondary-weather (forecast)
function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = date.getDay();

  return days[day];
}

// Function response for secondary-weather (forecast)
function showForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col day">
      <div class="weather-forecast-date">${formatForecastDay(
        forecastDay.dt
      )}</div>
      <img src="http://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png" alt=""/>
      <div class="weather-forecast-temperature">
        <strong>
          <span>${Math.round(forecastDay.temp.max)}°</span>
        </strong>
      </div>
      <div>
        <span>${Math.round(forecastDay.temp.min)}°</span>
      </div>
    </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// API call for secondary-weather (latitude and longitude)
function getForecast(coordinates) {
  let endpoint = "https://api.openweathermap.org/data/2.5/onecall";
  let apiKey = "31ee5db17333dd8cbc0df1677e0dc2c4";
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let units = "metric";
  let apiUrl = `${endpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showForecast);
}

// Format date for principal-weather
function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

// Function response for principal-weather
function showTemperature(response) {
  console.log(response.data);

  let cityElement = document.querySelector("#city");
  let iconElement = document.querySelector("#icon");
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");

  cityElement.innerHTML = response.data.name;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].icon);
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  getForecast(response.data.coord);

  //To change background image
  let todayIcon = response.data.weather[0].icon;
  let backgroundImage = document.querySelector("#background-image");

  if (todayIcon === "01d" || todayIcon === "01n") {
    backgroundImage.setAttribute(
      "style",
      `background-image:url(src/img/01d-01n-clear-sky.jpg)`
    );
  } else if (todayIcon === "02d" || todayIcon === "02n") {
    backgroundImage.setAttribute(
      "style",
      `background-image:url(src/img/02d-02n-few-clouds.jpg)`
    );
  } else if (todayIcon === "03d" || todayIcon === "03n") {
    backgroundImage.setAttribute(
      "style",
      `background-image:url(src/img/03d-03n-scattered-clouds.jpg)`
    );
  } else if (todayIcon === "04d" || todayIcon === "04n") {
    backgroundImage.setAttribute(
      "style",
      `background-image:url(src/img/04d-04n-broken-clouds.jpg)`
    );
  } else if (todayIcon === "09d" || todayIcon === "09n") {
    backgroundImage.setAttribute(
      "style",
      `background-image:url(src/img/09d-09n-shower-rain.jpg)`
    );
  } else if (todayIcon === "10d" || todayIcon === "10n") {
    backgroundImage.setAttribute(
      "style",
      `background-image:url(src/img/10d-10n-rain.jpg)`
    );
  } else if (todayIcon === "11d" || todayIcon === "11n") {
    backgroundImage.setAttribute(
      "style",
      `background-image:url(src/img/11d-11n-thunderstorm.jpg)`
    );
  } else if (todayIcon === "13d" || todayIcon === "13n") {
    backgroundImage.setAttribute(
      "style",
      `background-image:url(src/img/13d-13n-snow.jpg)`
    );
  } else if (todayIcon === "50d" || todayIcon === "50n") {
    backgroundImage.setAttribute(
      "style",
      `background-image:url(src/img/50d-50n-mist.jpg)`
    );
  }
}

// API call for principal-weather (city)
function search(city) {
  let endpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "31ee5db17333dd8cbc0df1677e0dc2c4";
  let units = "metric";
  let apiUrl = `${endpoint}?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

// Function to get the city from the search box
function getCity(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#cityInput");
  search(cityInputElement.value);
}

// Event listener when submitting the search button
let form = document.querySelector("#search-form");
form.addEventListener("submit", getCity);

// API call for current principal-weather (latitude and longitude)
function showPosition(position) {
  console.log(position.coords);

  let endpoint = "https://api.openweathermap.org/data/2.5/weather";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "31ee5db17333dd8cbc0df1677e0dc2c4";
  let units = "metric";
  let apiUrl = `${endpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

// Function to get the current position
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

// Event listener when clicking the current button
let currentPositionButton = document.querySelector(".btn-secondary");
currentPositionButton.addEventListener("click", getCurrentPosition);

// Principal information displayed
search("Belfast");
