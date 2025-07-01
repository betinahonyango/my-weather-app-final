function updateWeatherData(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperatureNew = temperatureElement
  let cityName = document.querySelector("#city-name");
  let weatherDescription = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let dateTime = document.querySelector("#date-time");
  let date = new Date(response.data.time * 1000);

  cityName.innerHTML = response.data.city;
  dateTime.innerHTML = formatDate(date);
  temperatureNew.innerHTML = Math.round(response.data.temperature.current) + "°C";
  weatherDescription.innerHTML = response.data.condition.description;
  humidity.innerHTML = response.data.temperature.humidity + "%";
  wind.innerHTML = response.data.wind.speed + "km/h";

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