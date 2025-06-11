const searchButton = document.querySelector(".search-box button");
const cityInput = document.querySelector(".search-box input");
const errorBox = document.querySelector(".not-found");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const feelslike = document.querySelector(".weather-details .feelslike span");

const container = document.querySelector(".container");
const APIKey = "API_KEY_HERE"; // Replace with your OpenWeatherMap API key
let city = cityInput.value;

searchButton.addEventListener("click", () => {
  city = cityInput.value;
  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      //city is not found
      if (data.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        errorBox.style.display = "block";
        errorBox.classList.add("fadeIn");
        return;
      }

      //Hide error message
      errorBox.style.display = "none";
      errorBox.classList.remove("fadeIn");

      //weather info
      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temp");
      const description = document.querySelector(".weather-box .info");
      const humidity = document.querySelector(".humidity-value");
      const wind = document.querySelector(".wind-value");
      const pressure = document.querySelector(".pressure-value");
      const feelslike = document.querySelector(".feelslike-value");
      const sunrise = document.querySelector(".sunrise-value");
      const sunset = document.querySelector(".sunset-value");

      //Image
      const iconCode = data.weather[0].icon;
      image.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

      temperature.innerHTML = `${Math.round(data.main.temp)}<span>°C</span>`;
      description.innerHTML = data.weather[0].description;
      humidity.textContent = data.main.humidity;
      wind.textContent = Math.round(data.wind.speed);
      pressure.textContent = data.main.pressure;
      feelslike.textContent = Math.round(data.main.feels_like);

      //Convert times
      const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString(
        [],
        { hour: "2-digit", minute: "2-digit" }
      );
      const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString(
        [],
        { hour: "2-digit", minute: "2-digit" }
      );
      sunrise.textContent = sunriseTime;
      sunset.textContent = sunsetTime;

      //results 
      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.remove("fadeIn");
      weatherDetails.classList.remove("fadeIn");
      void weatherBox.offsetWidth;
      void weatherDetails.offsetWidth;
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "auto";
    });
});

cityInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchButton.click(); 
  }
});

let canvas = document.getElementById("backgroundCanvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
for (let i = 0; i < 50; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 5 + 1,
    dx: Math.random() * 2 - 1,
    dy: Math.random() * 2 - 1,
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});