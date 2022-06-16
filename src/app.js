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

function showTemperature(response) {
  console.log(response.data);

  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp);

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];

  return `${day}`;
}

function showForecastTemperature(response) {
  /* Day 1 [0] */
  let day1Element = document.querySelector("#day1");
  let maxTemp1Element = document.querySelector("#maxTemp1");
  let minTemp1Element = document.querySelector("#minTemp1");
  let icon1Element = document.querySelector("#icon1");

  day1Element.innerHTML = formatForecastDay(response.data.list[0].dt * 1000);
  maxTemp1Element.innerHTML = Math.round(response.data.list[7].main.temp_max);
  minTemp1Element.innerHTML = Math.round(response.data.list[0].main.temp_min);

  icon1Element.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.list[0].weather[0].icon}@2x.png`
  );
  icon1Element.setAttribute(
    "alt",
    response.data.list[0].weather[0].description
  );

  /* Day 2 [8] */
  let day2Element = document.querySelector("#day2");
  let maxTemp2Element = document.querySelector("#maxTemp2");
  let minTemp2Element = document.querySelector("#minTemp2");
  let icon2Element = document.querySelector("#icon2");

  day2Element.innerHTML = formatForecastDay(response.data.list[8].dt * 1000);
  maxTemp2Element.innerHTML = Math.round(response.data.list[15].main.temp_max);
  minTemp2Element.innerHTML = Math.round(response.data.list[8].main.temp_min);

  icon2Element.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.list[8].weather[0].icon}@2x.png`
  );
  icon2Element.setAttribute(
    "alt",
    response.data.list[8].weather[0].description
  );

  /* Day 3 [16] */
  let day3Element = document.querySelector("#day3");
  let maxTemp3Element = document.querySelector("#maxTemp3");
  let minTemp3Element = document.querySelector("#minTemp3");
  let icon3Element = document.querySelector("#icon3");

  day3Element.innerHTML = formatForecastDay(response.data.list[16].dt * 1000);
  maxTemp3Element.innerHTML = Math.round(response.data.list[23].main.temp_max);
  minTemp3Element.innerHTML = Math.round(response.data.list[16].main.temp_min);

  icon3Element.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.list[16].weather[0].icon}@2x.png`
  );
  icon3Element.setAttribute(
    "alt",
    response.data.list[16].weather[0].description
  );

  /* Day 4 [24] */
  let day4Element = document.querySelector("#day4");
  let maxTemp4Element = document.querySelector("#maxTemp4");
  let minTemp4Element = document.querySelector("#minTemp4");
  let icon4Element = document.querySelector("#icon4");

  day4Element.innerHTML = formatForecastDay(response.data.list[24].dt * 1000);
  maxTemp4Element.innerHTML = Math.round(response.data.list[31].main.temp_max);
  minTemp4Element.innerHTML = Math.round(response.data.list[24].main.temp_min);

  icon4Element.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.list[24].weather[0].icon}@2x.png`
  );
  icon4Element.setAttribute(
    "alt",
    response.data.list[24].weather[0].description
  );

  /* Day 5 [32] */
  let day5Element = document.querySelector("#day5");
  let maxTemp5Element = document.querySelector("#maxTemp5");
  let minTemp5Element = document.querySelector("#minTemp5");
  let icon5Element = document.querySelector("#icon5");

  day5Element.innerHTML = formatForecastDay(response.data.list[32].dt * 1000);
  maxTemp5Element.innerHTML = Math.round(response.data.list[39].main.temp_max);
  minTemp5Element.innerHTML = Math.round(response.data.list[32].main.temp_min);

  icon5Element.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.list[32].weather[0].icon}@2x.png`
  );
  icon5Element.setAttribute(
    "alt",
    response.data.list[32].weather[0].description
  );
}

let city = "New York";
let lat = "40.7143";
let lon = "-74.006";
let apiKey = "31ee5db17333dd8cbc0df1677e0dc2c4";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
let forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(showTemperature);
axios.get(forecastApiUrl).then(showForecastTemperature);
