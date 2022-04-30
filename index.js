const express = require("express");
const Datastore = require("nedb");
const axios = require("axios");

require("dotenv").config();

const app = express();
app.listen(3000, () => {
  console.log("listening on port 3000");
});

app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const database = new Datastore("database.db");
database.loadDatabase();

app.get("/api/", (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.post("/api/", (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  response.json(data);
});

app.get("/weather/:LatLong", async (request, response) => {
  const { LatLong } = request.params;
  const LatLongValue = LatLong.split(",");
  const [latitude, longitude] = LatLongValue;

  const weather_response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_API_KEY}`
  );
  const weather_data = weather_response.data;

  const aq_response = await axios.get(
    `https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/latest?coordinates=${latitude}%2C${longitude}`
  );
  const aq_data = aq_response.data;

  const data = {
    weather_data,
    aq_data,
  };

  return response.status(200).json(data);
});
