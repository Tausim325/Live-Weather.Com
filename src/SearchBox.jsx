import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import SearchIcon from "@mui/icons-material/Search";
import "./SearchBox.css";
import { useState } from "react";

export default function SearchBox({ updateInfo, setError }) {
  let [city, setCity] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  let getwheatherInfo = async (city) => {
    try {
      let response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      if (!response.ok) {
        throw new Error("City not found");
      }
      let jsonResponse = await response.json();
      let localTimestamp = (jsonResponse.dt + jsonResponse.timezone) * 1000;
      let cityTime = new Date(localTimestamp).toLocaleTimeString("en-US", {
        timeZone: "UTC",
        hour: "2-digit",
        minute: "2-digit",
      });
      let result = {

        city: city,
        country: new Intl.DisplayNames(["en"], { type: "region" }).of(
          jsonResponse.sys.country
        ),

        city: city,
        country: new Intl.DisplayNames(["en"], { type: "region" }).of(
          jsonResponse.sys.country
        ),

        temp: jsonResponse.main.temp,
        tempMax: jsonResponse.main.temp_max,
        tempMin: jsonResponse.main.temp_min,
        humidity: jsonResponse.main.humidity,
        feelslike: jsonResponse.main.feels_like,
        weather: jsonResponse.weather[0].description,
        pressure: jsonResponse.main.pressure,
        seaLevel: jsonResponse.main.sea_level,
        time: cityTime,
        windSpeed: jsonResponse.wind.speed,
      };

      return result;
    } catch (err) {
      throw err;
    }
  };
  let handleChange = (evt) => {
    setCity(evt.target.value);
  };

  let handleSubmit = async (evt) => {
    try {
      evt.preventDefault();
      setCity("");
      let newInfo = await getwheatherInfo(city);
      setError(false);
      updateInfo(newInfo);
    } catch (err) {
      setError(true);
      updateInfo({ error: true });

    }
  };
  return (
    <div className="SearchBox">
      <form onSubmit={handleSubmit}>
        <TextField id="city"
          label="City Name"
          variant="outlined"
          value={city}
          onChange={handleChange}
          required
        />
        <Button variant="contained" type="submit" id="bt">
          <SearchIcon />
        </Button>
      </form>
    </div>
  );
}