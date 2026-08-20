const apiKey = "ade65daf4b8d65a4a2457b07e4e09a7e";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weatherDescription");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const errorMessage = document.getElementById("errorMessage");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (city === "") {
        errorMessage.textContent = "Please enter a city name.";
        return;
    }

    getWeather(city);
});

cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const city = cityInput.value.trim();

        if (city !== "") {
            getWeather(city);
        }
    }
});

async function getWeather(city) {

    errorMessage.textContent = "";

    try {
        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("Invalid API key.");
            }

            if (response.status === 404) {
                throw new Error("City not found.");
            }

            throw new Error("Unable to get weather data.");
        }

        const data = await response.json();

        cityName.textContent = `${data.name}, ${data.sys.country}`;

        temperature.textContent =
            `${Math.round(data.main.temp)}°C`;

        weatherDescription.textContent =
            data.weather[0].description;

        feelsLike.textContent =
            `${Math.round(data.main.feels_like)}°C`;

        humidity.textContent =
            `${data.main.humidity}%`;

        windSpeed.textContent =
            `${(data.wind.speed * 3.6).toFixed(1)} km/h`;

        weatherIcon.src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        weatherIcon.alt =
            data.weather[0].description;

    } catch (error) {

        errorMessage.textContent = error.message;

        cityName.textContent = "Search for a city";
        temperature.textContent = "--°C";
        weatherDescription.textContent = "--";
        feelsLike.textContent = "--°C";
        humidity.textContent = "--%";
        windSpeed.textContent = "-- km/h";
        weatherIcon.src = "";
    }
}
