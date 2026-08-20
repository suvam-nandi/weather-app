const apiKey = "ade65daf4b8d65a4a2457b07e4e09a7e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherInfo = document.getElementById("weather-info");
const errorMsg = document.getElementById("error-msg");

async function checkWeather(city) {
    if (!city.trim()) return;

    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (response.status === 404) {
            errorMsg.innerText = "City not found. Please try again!";
            errorMsg.style.display = "block";
            weatherInfo.style.display = "none";
            return;
        }

        const data = await response.json();

        // Data Rendering
        document.getElementById("city-name").innerText = `${data.name}, ${data.sys.country}`;
        document.getElementById("temp").innerText = `${Math.round(data.main.temp)}°C`;
        document.getElementById("description").innerText = data.weather[0].description;
        document.getElementById("humidity").innerText = `${data.main.humidity}%`;
        document.getElementById("wind").innerText = `${data.wind.speed} km/h`;

        // Weather Icon Dynamic Fetch
        const iconCode = data.weather[0].icon;
        document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        // UI Toggling
        errorMsg.style.display = "none";
        weatherInfo.style.display = "block";

    } catch (error) {
        console.error("Error fetching weather data:", error);
        errorMsg.innerText = "Something went wrong! Try again.";
        errorMsg.style.display = "block";
        weatherInfo.style.display = "none";
    }
}

// Event Listeners
searchBtn.addEventListener("click", () => {
    checkWeather(cityInput.value);
});

cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(cityInput.value);
    }
});
