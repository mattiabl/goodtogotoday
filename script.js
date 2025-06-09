const statusDiv = document.getElementById("status");
const quoteDiv = document.getElementById("quote");

// Display loading message
statusDiv.innerText = "Checking conditions at your location...";

navigator.geolocation.getCurrentPosition(async (position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  const OPENWEATHERMAP_API_KEY = window.ENV.OPENWEATHERMAP_API_KEY;
  const IQAIR_API_KEY = window.ENV.IQAIR_API_KEY;

  try {
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`
    );
    const weatherData = await weatherResponse.json();

    const aqiResponse = await fetch(
      `https://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=${IQAIR_API_KEY}`
    );
    const aqiData = await aqiResponse.json();
    const aqi = aqiData.data.current.pollution.aqius;

    // Determine emojis based on weather and AQI
    let emoji = "🌤";
    if (weatherData.weather[0].main.includes("Rain")) {
      emoji = "🌧";
    } else if (weatherData.weather[0].main.includes("Snow")) {
      emoji = "❄️";
    } else if (weatherData.weather[0].main.includes("Clear")) {
      emoji = "☀️";
    } else if (weatherData.weather[0].main.includes("Cloud")) {
      emoji = "☁️";
    }

    let aqiEmoji = "😷";
    let aqiDescription = "Air quality unknown";
    if (aqi <= 50) {
      aqiEmoji = "😊";
      aqiDescription = "Good air quality";
    } else if (aqi <= 100) {
      aqiEmoji = "😐";
      aqiDescription = "Moderate air quality";
    } else if (aqi <= 150) {
      aqiEmoji = "😷";
      aqiDescription = "Unhealthy for sensitive groups";
    } else {
      aqiEmoji = "🤢";
      aqiDescription = "Unhealthy air quality";
    }

    statusDiv.innerText = `${emoji} ${weatherData.name}: ${weatherData.main.temp}°C\n${aqiEmoji} ${aqiDescription}`;

  } catch (error) {
    statusDiv.innerText = "❌ Failed to load weather or air quality data.";
    console.error(error);
  }
});

// Load a rotating quote
fetch("quotes/quotes.json")
  .then(response => response.json())
  .then(data => {
    const lang = ["EN", "DE", "FR"].includes(navigator.language.slice(0, 2).toUpperCase())
      ? navigator.language.slice(0, 2).toUpperCase()
      : "EN";

    const quotes = data[lang];
    const day = new Date().getDate();
    const quote = quotes[day % quotes.length];
    quoteDiv.innerText = `“${quote}”`;
  })
  .catch(error => {
    quoteDiv.innerText = "Could not load quote.";
    console.error(error);
  });

// Service Worker registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log("✅ Service Worker registered"))
      .catch(err => console.error("❌ SW error", err));
  });
}