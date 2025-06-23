function searchCity(event) {
  event.preventDefault();

  let city = document.querySelector("#nameCity").value;
  document.querySelector("#city").innerHTML = city;

  let apiKey = "d03cbc9of2636a047c1f18afat64d481";
  let currentWeatherURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  let forecastURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(currentWeatherURL).then(displayTemp);
  axios.get(forecastURL).then(displayForecast);
}

let searchFormElement = document.querySelector(".searchForm");
searchFormElement.addEventListener("submit", searchCity); //if form is submitted then call the searchCity function

//displayTemp
function displayTemp(response) {
  let temp = document.querySelector("#Current-Temp");
  temp.innerHTML = Math.round(response.data.temperature.current) + "°C";

  displayHumidity(response); // call it here cus response is defined
  displayDayTime(response);
}

function displayHumidity(response) {
  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.temperature.humidity;
  let windSpeed = response.data.wind.speed; // Adjust path based on actual structure

  humidityElement.innerHTML =
    "Humidity: " + humidity + "%" + " | Wind Speed: " + windSpeed + " km/h";
}
// i'll come back for this later
function displayDayTime(response) {
  let timestamp = response.data.time * 1000;
  let date = new Date(timestamp);

  let day = date.toDateString(); // e.g. "Mon Jun 23 2025"
  let time = date.toTimeString().split(" ")[0].slice(0, 5); // "14:45"

  let description = response.data.condition.description;

  document.querySelector("#day").innerHTML = `${day}, ${time}, ${description}`;
}

//assisted , also need to learn
function displayForecast(response) {
  let forecastHTML = "";
  let forecastData = response.data.daily;

  forecastData.slice(0, 5).forEach(function (day) {
    let date = new Date(day.time * 1000);
    let weekday = date.toLocaleDateString("en-US", { weekday: "long" });
    let icon = day.condition.icon_url; // icon URL from API
    let description = day.condition.description;
    let max = Math.round(day.temperature.maximum);
    let min = Math.round(day.temperature.minimum);

    forecastHTML += `
      <div class="forecast-day">
        <div class="day">${weekday}</div>
        <img src="${icon}" alt="${description}" class="forecast-icon" />
        <div class="temp">${max}° / ${min}°</div>
        <div class="description">${description}</div>
      </div>
    `;
  });

  document.querySelector("#forecast").innerHTML = forecastHTML;
}
