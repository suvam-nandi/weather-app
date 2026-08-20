const apiKey = "1b6fd93b22366d39740d97489d728c3d";
async function getWeather() {

    const city = document.getElementById("city").value;

    if(city === ""){
        alert("Enter city name");
        return;
    }

    const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try{

        const response = await fetch(url);
        const data = await response.json();

        document.getElementById("cityName").innerText =
        data.name;

        document.getElementById("temp").innerText =
        `${data.main.temp}°C`;

        document.getElementById("condition").innerText =
        data.weather[0].main;

        document.getElementById("humidity").innerText =
        data.main.humidity;

        document.getElementById("wind").innerText =
        data.wind.speed;

    }catch(error){
        alert("City not found");
    }
}
