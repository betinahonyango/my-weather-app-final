function updateWeatherData(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperatureNew = temperatureElement
  let cityName = document.querySelector("#city-name");
  let weatherDescription = document.querySelector("#description");
 
  cityName.innerHTML = response.data.city;
  temperatureNew.innerHTML = Math.round(response.data.temperature.current) + "°C";
  weatherDescription.innerHTML = response.data.condition.description;
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