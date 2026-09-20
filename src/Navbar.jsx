import HomeIcon from "@mui/icons-material/Home";
import SearchBox from "./SearchBox";
import "./Navbar.css";

export default function Navbar({ homeWeather, updateInfo, setError }) {
  return (
    <div className="Navbar">
      <div className="nav-left">
        <HomeIcon className="home-icon" onClick={homeWeather} />
        <h2>Live Weather.Com</h2>
      </div>
      <SearchBox updateInfo={updateInfo} setError={setError} />
    </div>
  );
}