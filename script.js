function getWeather() {
    const locationInput = document.getElementById('locationInput').value;
  
    // Replace 'YOUR_API_KEY' with your OpenWeatherMap API key
    const apiKey = '0b49f4f02018738acfd701e37b3c5860';
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;
  
    if (locationInput) {
      apiUrl += `q=${locationInput}&`;
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          apiUrl += `lat=${latitude}&lon=${longitude}&`;
          fetchWeather(apiUrl, apiKey);
        });
        return;
      } else {
        alert("Geolocation is not supported by this browser. Please enter a location manually.");
        return;
      }
    }
    fetchWeather(apiUrl, apiKey);
  }
  
  function fetchWeather(apiUrl, apiKey) {
    apiUrl += `units=metric&appid=${apiKey}`;
  
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        displayWeather(data);
      })
      .catch((error) => {
        console.error('There was a problem fetching the weather data: ', error);
      });
  }
  
  function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>Weather: ${data.weather[0].main}</p>
      <p>Description: ${data.weather[0].description}</p>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
  }