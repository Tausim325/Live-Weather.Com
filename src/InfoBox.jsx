import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import "./InfoBox.css";

import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import SpeedIcon from "@mui/icons-material/Speed";
import WavesIcon from "@mui/icons-material/Waves";
import AirIcon from "@mui/icons-material/Air";
import CloudIcon from "@mui/icons-material/Cloud";
import BlurOnIcon from "@mui/icons-material/BlurOn";

export default function InfoBox({ info, error }) {
  const DEFAULT_URL = "https://plus.unsplash.com/premium_photo-1770245801748-2a1bcffea39b?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const HOT_URL = "https://images.unsplash.com/photo-1601297183305-6df142704ea2?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const COLD_URL = "https://plus.unsplash.com/premium_photo-1661428903746-a2c4ac451c59?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const RAIN_URL = "https://plus.unsplash.com/premium_photo-1664303017917-71ebeb42343d?q=80&w=773&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const ERROR_URL = "https://images.unsplash.com/photo-1578429828360-f6baa77b4168?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const weatherImage =
    error
      ? ERROR_URL
      : info.city === "mumbai"
        ? DEFAULT_URL
        : info.humidity > 80
          ? RAIN_URL
          : info.temp > 15
            ? HOT_URL
            : COLD_URL;

  const getWeatherIcon = (weather) => {
    const w = weather?.toLowerCase() || "";

    if (w.includes("rain") || w.includes("drizzle") || w.includes("thunderstorm")) {
      return <ThunderstormIcon />;
    } else if (w.includes("snow")) {
      return <AcUnitIcon />;
    } else if (w.includes("cloud")) {
      return <CloudIcon />;
    } else if (w.includes("haze") || w.includes("mist") || w.includes("fog") || w.includes("smoke")) {
      return <BlurOnIcon />;
    } else {
      return <WbSunnyIcon />;
    }
  };

  return (
    <div className="InfoBox" style={{ backgroundImage: `url(${weatherImage})` }}>
      <Card className="weather-card">
        <CardContent>
          <Typography gutterBottom
            variant="h5"
            component="div"
            className="city-heading"
          >
            <div className="country-time">
              <span className="country-name">
                {info.country && `${info.country} : `}
              </span>
              <span className="local-time">
                {info.time}
              </span>
            </div>
            {!error && info.city && (
              <>
                Weather of {info.city.charAt(0).toUpperCase() + info.city.slice(1)}
                {getWeatherIcon(info.weather)}
              </>
            )}
          </Typography>
          {error && (
            <p className="err-msg">
              NO such place existing in our API
            </p>
          )}
          {!error && (
            <span className="degree">{info.temp}&deg;C</span>
          )}{"  "}

          {!error && info.city && (
            <div className="feel">
              <div className="weather-feel">
                <div>Feel Like</div>
                <div>
                  <i>{info.weather}</i>
                </div>
                {getWeatherIcon(info.weather)}
              </div>
            </div>
          )}
          <Typography
            variant="body2" color="text.secondary" component="div" className="weather-details" >
            <span className="weather-item">
              <div>Humidity</div>
              <div>{info.humidity}%</div>
              <WaterDropIcon />
            </span>
            {""}
            <span className="weather-item">
              <div>Min Temp</div>
              <div>{info.tempMin}&deg;C</div>
              <KeyboardArrowDownIcon />
            </span>
            {"  "}
            <span className="weather-item">
              <div>Max Temp</div>
              <div>{info.tempMax}&deg;C</div>
              <KeyboardArrowUpIcon />
            </span>
            {"  "}
            <span className="weather-item">
              <div>Pressure</div>
              <div>{info.pressure} hPa</div>
              <SpeedIcon />
            </span>
            {"  "}
            <span className="weather-item">
              <div>Wind Speed</div>
              <div>{info.windSpeed} m/s</div>
              <AirIcon />
            </span>
            <span className="weather-item">
              <div>Sea Level</div>
              <div>{info.seaLevel} hPa</div>
              <WavesIcon />
            </span>
            {"  "}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}