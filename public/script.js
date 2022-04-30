console.log("weather app");

async function getLatLon() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      const btn = document.getElementById("btn");

      btn.addEventListener("click", () => {
        const name = document.getElementById("name").value;
        console.log("name", name);
        sendGeolocation(latitude, longitude, name);
        alert("data sent to server successfully");
        name = document.getElementById("name").value = "";
      });

      const data = await getCurrentWeather(latitude, longitude);
      const { aq_data, weather_data } = data;
      const { weather } = weather_data;

      const { measurements } = aq_data.results[0];
      const { parameter, unit, value, lastUpdated } = measurements[0];

      console.log(measurements);
      // weather data
      document.getElementById("lat").innerHTML = latitude;
      document.getElementById("lon").innerHTML = longitude;
      document.getElementById("description").innerHTML = weather[0].description;
      document.getElementById("temperature").innerHTML = weather[0].icon;

      // aq data
      document.getElementById("parameter").innerHTML = parameter;
      document.getElementById("value").innerHTML = value;
      document.getElementById("unit").innerHTML = unit;
      document.getElementById("lastUpdated").innerHTML = lastUpdated;
    });
  } else {
    console.log("geolocation is not available");
  }
}

async function sendGeolocation(latitude, longitude, name) {
  const data = { latitude, longitude, name };
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch("/api", options);
  const json = await response.json();
  console.log(json);
}

async function getCurrentWeather(latitude, longitude, name) {
  const response = await fetch(`/weather/${latitude},${longitude}`);
  const data = await response.json();
  return data;
}

getLatLon();
