function updateWeatherData(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperatureNew = temperatureElement;
  let cityName = document.querySelector("#city-name");
  let weatherDescription = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let dateTime = document.querySelector("#date-time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  cityName.innerHTML = response.data.city;
  dateTime.innerHTML = formatDate(date);
  temperatureNew.innerHTML = Math.round(response.data.temperature.current) + "°C";
  weatherDescription.innerHTML = response.data.condition.description;
  humidity.innerHTML = response.data.temperature.humidity + "%";
  wind.innerHTML = response.data.wind.speed + "km/h";
  iconElement.innerHTML = `<img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png" class="weather-icon"/>`;
  getDailyForecast(response.data.city);
}

function formatDate(date) {
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${days[date.getDay()]} ${hours}:${minutes}`;
}

function getDailyForecast(city) {
  let apiKey = "50do3122d9528t350cd40fbf4dc0035a";  
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecastInfo);
}

function displayForecastInfo(response) { 
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = ""; 

  response.data.daily.slice(1, 7).forEach(function(day) {
    let date = new Date(day.time * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let dayName = days[date.getDay()];
    forecastHTML += `
      <div class="weather-one">
        <div class="weather-one-date">${dayName}</div>
        <div class="weather-one-icon">
          <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${day.condition.icon}.png" width="48" />
        </div>
        <div class="weather-one-temp">${Math.round(day.temperature.maximum)}°C / ${Math.round(day.temperature.minimum)}°C</div>
      </div>
    `;
  });
  forecastElement.innerHTML = forecastHTML;
}

function getWeatherData(city) {
  let apiKey = "50do3122d9528t350cd40fbf4dc0035a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(updateWeatherData);
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  getWeatherData(searchInput.value);
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", searchCity);

getWeatherData("Paris");
