let now = new Date();
function today() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
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
  let day = days[now.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let number = now.getDate();
  let month = months[now.getMonth()];
  let date = document.querySelector("#day");
  date.innerHTML = `${day} ${hours}:${minutes}`;
  let dateMonth = document.querySelector("#date");
  dateMonth.innerHTML = `${month}, ${number}`;
}
today(now);

function searchfield(event) {
  event.preventDefault();
  let cityName = document.querySelector("#text-input");
  let cityTitle = document.querySelector("#city");
  cityTitle.innerHTML = cityName.value;
  let pageTitleCity = document.querySelector("#page-title");
  pageTitleCity.innerHTML = `Weather in ${cityName.value}`;
  searchCity(cityName.value);
}

function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
navigator.geolocation.getCurrentPosition(searchCity);

function showCurrentLocation(event) {
  event.preventDefault();
  let cityTitle = document.querySelector("#city");
  cityTitle.innerHTML = currentCity.name;
  let pageTitleCity = document.querySelector("#page-title");
  pageTitleCity.innerHTML = `Weather in ${currentCity.name}`;
  currentCity(currentCity.name);
}

function currentCity(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat);
  console.log(lon);
  let apiUrl = `https://api.openweathermap.org/data/1.0/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
navigator.geolocation.getCurrentPosition(currentCity);

function showTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  let degreeTopSearch = document.querySelector("#degree-top");
  degreeTopSearch.innerHTML = `${temp}°C`;
}

let apiKey = "40b745c14eadad7b7c4e6e4bf3b70103";

let search = document.querySelector("#search-form");
search.addEventListener("submit", searchfield);
let currentLocation = document.querySelector("#button-location");
currentLocation.addEventListener("click", showCurrentLocation);
