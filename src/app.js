const apiKey = "1fa9ff4126d95b8db54f3897a208e91c";
const apiUrlCurrentWeather = "https://api.openweathermap.org/data/2.5/weather?";
const apiUrlForecast = "https://api.openweathermap.org/data/2.5/forecast?";
const units = "imperial"; // Use imperial units for Fahrenheit

function searchCity(city) {
  const apiCurrentWeatherSearchString = `${apiUrlCurrentWeather}q=${city}&appid=${apiKey}&units=${units}`;
  axios
    .get(apiCurrentWeatherSearchString)
    .then((response) => {
      displayCurrentWeather(response);
      return `${city}, ${response.data.sys.country}`;
    })
    .then((cityCountry) => {
      document.querySelector("#city-and-country").innerHTML = cityCountry;
    });

  const apiHourlySearchString = `${apiUrlForecast}q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiHourlySearchString).then(displayHourlyForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  const cityInput = document.querySelector("#search-city-input");
  searchCity(cityInput.value);
}

const searchCityForm = document.querySelector("#search-city-form");
searchCityForm.addEventListener("submit", handleSubmit);

const searchCityButton = document.querySelector("#search-city-button");
searchCityButton.addEventListener("click", handleSubmit);

function searchLocation(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const apiSearchString = `${apiUrlCurrentWeather}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios
    .get(apiSearchString)
    .then((response) => {
      displayCurrentWeather(response);
      return `${response.data.name}, ${response.data.sys.country}`;
    })
    .then((cityCountry) => {
      document.querySelector("#city-and-country").innerHTML = cityCountry;
    });
}

function getGeolocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

const geolocationButton = document.querySelector("#geolocation-button");
geolocationButton.addEventListener("click", getGeolocation);

function searchNewYork(event) {
  event.preventDefault();
  searchCity("New York");
  document.querySelector("#city-and-country").innerHTML = "New York";
}

const newYorkButton = document.querySelector("#new-york-button");
newYorkButton.addEventListener("click", searchNewYork);

function searchPortland(event) {
  event.preventDefault();
  searchCity("Portland");
  document.querySelector("#city-and-country").innerHTML = "Portland";
}

const PortlandButton = document.querySelector("#Portland-button");
PortlandButton.addEventListener("click", searchPortland);

function searchBoston(event) {
  event.preventDefault();
  searchCity("Boston");
  document.querySelector("#city-and-country").innerHTML = "Boston";
}

const BostonButton = document.querySelector("#Boston-button");
BostonButton.addEventListener("click", searchBoston);

function formatDate(date, timezone) {
  const localOffsetInMs = date.getTimezoneOffset() * 60 * 1000;
  const targetOffsetInMs = timezone * 1000;
  const targetTimestamp = date.getTime() + localOffsetInMs + targetOffsetInMs;

  const now = new Date(targetTimestamp);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = days[now.getDay()];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[now.getMonth()];
  const dayIndex = now.getDate();
  const year = now.getFullYear();

  const hours = now.getHours();
  const minutes = now.getMinutes();

  const currentTime = `${(hours % 12).toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${hours >= 12 ? "PM" : "AM"}`;
  const dateTimeElement = document.querySelector("#current-date-and-time");
  dateTimeElement.innerHTML = `${day}, ${dayIndex} ${month} ${year} &nbsp;|&nbsp; Local time: ${currentTime}`;

  return `${day}, ${dayIndex} ${month} ${year} &nbsp;|&nbsp; Local time: ${currentTime}`;
}

function getIcon(icon) {
  let iconElement = "";
  if (icon === "01d") {
    iconElement = "image/01d.png";
  } else if (icon === "01n") {
    iconElement = "image/01n.png";
  } else if (icon === "02d") {
    iconElement = "image/02d.png";
  } else if (icon === "02n") {
    iconElement = "image/02n.png";
  } else if (icon === "03d") {
    iconElement = "image/03d.png";
  } else if (icon === "03n") {
    iconElement = "image/03n.png";
  } else if (icon === "04d") {
    iconElement = "image/04d.png";
  } else if (icon === "04n") {
    iconElement = "image/04n.png";
  } else if (icon === "09d") {
    iconElement = "image/09d.png";
  } else if (icon === "09n") {
    iconElement = "image/09n.png";
  } else if (icon === "10d") {
    iconElement = "image/10d.png";
  } else if (icon === "10n") {
    iconElement = "image/10n.png";
  } else if (icon === "11d") {
    iconElement = "image/11d.png";
  } else if (icon === "11n") {
    iconElement = "image/11n.png";
  } else if (icon === "13d") {
    iconElement = "image/13d.png";
  } else if (icon === "13n") {
    iconElement = "image/13n.png";
  } else if (icon === "50d") {
    iconElement = "image/50d.png";
  } else if (icon === "50n") {
    iconElement = "image/50n.png";
  }
  return iconElement;
}

// Function to change background color based on time of day
function changeBackgroundColor() {
  const currentTime = new Date().getHours();
  const body = document.body;

  if (currentTime < 20) {
    // Before 8pm
    body.style.backgroundColor = "yellow";
  } else {
    // After 8pm
    body.style.backgroundColor = "gray";
  }
}

// Call the function to change background color
changeBackgroundColor();

function displayCurrentWeather(response) {
  document.querySelector("#city-and-country").innerHTML =
    response.data.name + ", " + response.data.sys.country;
  document.querySelector("#current-date-and-time").innerHTML = formatDate(
    new Date(),
    response.data.timezone
  );

  document
    .querySelector("#current-weather-icon")
    .setAttribute("src", getIcon(response.data.weather[0].icon));

  document.querySelector("#current-weather-description").innerHTML =
    response.data.weather[0].description;

  const fahrenheitTemperature = response.data.main.temp;
  document.querySelector("#current-temperature").innerHTML =
    Math.round(fahrenheitTemperature) + "°";

  document.querySelector("#maximum-temperature").innerHTML =
    " " + Math.round(response.data.main.temp_max) + "°";
  document.querySelector("#minimum-temperature").innerHTML =
    " " + Math.round(response.data.main.temp_min) + "°";

  document.querySelector("#real-feel").innerHTML =
    " " + Math.round(response.data.main.feels_like) + "°";
  document.querySelector("#humidity").innerHTML =
    " " + response.data.main.humidity + "%";
  document.querySelector("#wind").innerHTML =
    " " + Math.round(response.data.wind.speed) + " mph";

  const longitude = response.data.coord.lon;
  const latitude = response.data.coord.lat;
  fetchDailyForecast(latitude, longitude);

  const currentTime = new Date();
  updateBackgroundColor(currentTime);
}

function formatHours(timestamp) {
  const date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${(hours % 12).toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${hours >= 12 ? "PM" : "AM"}`;
}

function displayHourlyForecast(response) {
  const hourlyForecastElement = document.querySelector("#hourly-forecast");
  hourlyForecastElement.innerHTML = null;
  let hourlyForecast = null;

  for (let index = 0; index < 5; index++) {
    hourlyForecast = response.data.list[index];
    const localTimestamp = hourlyForecast.dt + response.data.city.timezone;

    hourlyForecastElement.innerHTML += `
    <div class="col hour-box">
    <bold>${formatHours(localTimestamp * 1000)}</bold>
    <div class="col hour-weather-icon">
    <img src="${getIcon(hourlyForecast.weather[0].icon)}" 
     width="21" height="21"/></div>
    <div class="col" id="hour-temperature-forecast">
    ${Math.round(hourlyForecast.main.temp)}°
    </div>
    </div>`;
  }
}

function getNameOfWeekDay(timestamp) {
  const date = new Date(timestamp);
  const weekDays = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  const weekDay = weekDays[date.getDay()];
  return `${weekDay}`;
}

function fetchDailyForecast(latitude, longitude) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayDailyForecast);
}

function displayDailyForecast(response) {
  const dailyForecastElement = document.querySelector("#daily-forecast");
  dailyForecastElement.innerHTML = null;
  let dailyForecast = null;

  for (let index = 1; index < 6; index++) {
    dailyForecast = response.data.daily[index];

    dailyForecastElement.innerHTML += `
    <div class="col day-forecast">
    ${getNameOfWeekDay(dailyForecast.dt * 1000)}
    <div class="col weather-icon-forecast">
     <img src="${getIcon(
       dailyForecast.weather[0].icon
     )}" width="21" height="21"/>
    </div>
    <div class="col" id="day-temperature-forecast">
   ${Math.round(dailyForecast.temp.day)}°
    </div>
    </div>`;
  }
}

searchCity("New York");
