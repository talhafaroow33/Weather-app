console.log("weather app");

async function getLatLon() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      document.getElementById("lat").innerHTML = latitude;
      document.getElementById("lon").innerHTML = longitude;
      const btn = document.getElementById("btn");

      btn.addEventListener("click", () => {
        const name = document.getElementById("name").value;
        console.log("name", name);
        sendGeolocation(latitude, longitude, name);
        alert("data sent to server successfully");
        name = document.getElementById("name").value = "";
      });

      getCurrentWeather(latitude, longitude);
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
  const json = await response.json();
  console.log(json);
}

getLatLon();
