import { useState } from "react";
import InfoBox from "./InfoBox";
import "./WeatherApp.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function WeatherApp() {
  const navigate = useNavigate();
  const [weatherInfo, setWeatherInfo] = useState({
    city: "mumbai",
    feelslike: 24.84,
    temp: 25.05,
    tempMin: 25.05,
    tempMax: 25.05,
    humidity: 47,
    pressure: 1012,
    seaLevel: 1020,
    weather: "haze",
    error: false,
  });

  const [error, setError] = useState(false);
  let updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  };
  let homeWeather = () => {
    setError(false);
    setWeatherInfo({
      city: "mumbai",
      feelslike: 24.84,
      temp: 25.05,
      tempMin: 25.05,
      tempMax: 25.05,
      humidity: 47,
      pressure: 1012,
      seaLevel: 1020,
      weather: "haze",
      error: false,
    });
  };
  return (
    <div className="bg-color">
      <Navbar
        homeWeather={homeWeather}
        updateInfo={updateInfo}
        setError={setError}
      />
      <InfoBox info={weatherInfo} error={error} />
    </div>
  );
}