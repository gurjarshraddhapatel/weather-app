const express = require("express");
const axios = require('axios');
const app = express();

// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve the public folder as static files
app.use(express.static("public"));


app.get("/",  (req, res) => {
  res.render("index", { weather: null, error: null });
});

// Handle the /weather route
app.get("/weather", async (req, res) => {
  // Get the city from the query parameters
  const city = req.query.city;
  const apikey = '76045e56b36c67988ae4e58e40c74d11'


  // Add your logic here to fetch weather data from the API
  const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apikey}`;
  let weather;
  let error = null
  try{
    const response = await axios.get(APIUrl);
    // console.log(response);
    weather = response.data;
  }catch(error){
    weather = null;
    error = "Error, please try again";

  }

  res.render("index", { weather, error });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
