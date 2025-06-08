document.addEventListener("DOMContentLoaded", async () => {
  const statusDiv = document.getElementById("status");
  const quoteDiv = document.getElementById("quote");
  const lang = navigator.language.slice(0, 2).toUpperCase();

  const OPENWEATHERMAP_API_KEY = "b82135431da9a8f0199c0962ee487f4c";
  const IQAIR_API_KEY = "60ba2ed9-a3d4-4966-be1d-2d447a70dbf3";

  try {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      statusDiv.innerText = `Checking conditions at your location...`;

      const weatherResp = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHERMAP_API_KEY}`);
      const weatherData = await weatherResp.json();
      const temp = weatherData.main.temp;

      const airResp = await fetch(`https://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=${IQAIR_API_KEY}`);
      const airData = await airResp.json();
      const pm25 = airData.data.current.pollution.pm25;

      const safe = pm25 < 50 && temp >= 5 && temp <= 30;
      statusDiv.innerText = safe ? "✅ You're good to go!" : "⚠️ Maybe stay inside today.";

      const res = await fetch("quotes/quotes.json");
      const quotes = await res.json();
      const qlist = quotes[lang] || quotes["EN"];
      const index = new Date().getDate() % qlist.length;
      quoteDiv.innerText = qlist[index];
    }, () => {
      statusDiv.innerText = "❌ Location access denied.";
    });
  } catch (err) {
    statusDiv.innerText = "❌ Could not load data.";
  }
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log("✅ Service Worker registered"))
      .catch(err => console.error("❌ Service Worker failed", err));
  });
}