const buttons = document.querySelectorAll("button[data-target]");
const locations = document.querySelectorAll(".location");
const iframe = document.getElementById("mapFrame");

const zoomClasses = [
    "zoom-center",
    "zoom-suren",
    "zoom-nevina",
    "zoom-hileon",
    "zoom-astereen",
    "zoom-gurog"
];

let activeTarget = null;

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const target = btn.dataset.target;

        // SECOND CLICK → reset everything
        if (activeTarget === target) {
            locations.forEach(loc => loc.style.display = "none");
            iframe.classList.remove(...zoomClasses);
            iframe.classList.add("zoom-center");
            activeTarget = null;
            return;
        }

        // FIRST CLICK → zoom to location
        activeTarget = target;

        locations.forEach(loc => loc.style.display = "none");
        document.getElementById(`${target}-location`).style.display = "block";

        iframe.classList.remove(...zoomClasses);
        iframe.classList.add(`zoom-${target.toLowerCase()}`);
    });
});
//  Weather Script
document.addEventListener("DOMContentLoaded", () => {
  loadWeather(82.8628, 135.0000, "Suren-weather");   // Suren
  loadWeather(53.3498, -6.2603, "Nevina-weather");   // Nevina
  loadWeather(23.4162, 25.6628, "Hileon-weather");      // Hileon
  loadWeather(41.8967, 12.4822, "Gurog-weather");      // Gurog
  loadWeather(3.4653, 62.2159, "Astereen-weather");      // Astereen
});

async function loadWeather(latitude, longitude, elementId) {
  const weatherElement = document.getElementById(elementId);

  if (!weatherElement) return;

  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.current_weather) {
      throw new Error("Weather data not available.");
    }

    const temperature = data.current_weather.temperature;

    weatherElement.textContent = `${temperature}°C`;

  } catch (error) {
    weatherElement.textContent = "Unable to load.";
    console.error(error);
  }
}