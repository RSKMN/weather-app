const apiKey = "8fa6861c182d5e7aa3319847acf4b698";
let currentCity = "Hyderabad";

document.getElementById("citySelector").addEventListener("change", (e) => {
  currentCity = e.target.value;
  updateWeather();  
});

async function updateWeather() {
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&units=metric&appid=${apiKey}`);
    const data = await res.json();

    const lat = data.coord.lat;
    const lon = data.coord.lon;

    document.getElementById("city").textContent = currentCity;
    document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    document.getElementById("temperature").textContent = `${Math.round(data.main.temp)} °C`;
    document.getElementById("weatherData").textContent = data.weather[0].main;
    document.getElementById("weatherDescription").textContent = data.weather[0].description;
    document.getElementById("humidity").textContent = data.main.humidity;
    document.getElementById("wind-speed").textContent = Math.round(data.wind.speed * 3.6);

    const directions = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
    const idx = Math.round(data.wind.deg / 22.5) % 16;
    document.getElementById("wind-direction").textContent = directions[idx];

    await fetchAQI(lat, lon);
  } catch (err) {
    console.error("Weather fetch error:", err);
  }
}

async function fetchAQI(lat, lon) {
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`);
    const data = await res.json();

    const aqi = data.list[0].main.aqi;
    const descriptions = ["", "Good", "Fair", "Moderate", "Poor", "Very Poor"];
    document.getElementById("aqi-value").textContent = aqi;
    document.getElementById("aqi-text").textContent = descriptions[aqi];
  } catch (err) {
    console.error("AQI fetch error:", err);
  }
}

document.addEventListener("DOMContentLoaded", updateWeather);
