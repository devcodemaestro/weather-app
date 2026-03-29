import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import { ClipLoader } from "react-spinners";

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const cities = ["paris", "new york", "seoul", "tokyo"];
  const [cityName, setCityName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setAPIError] = useState("");

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=kr `;
      let response = await fetch(url);
      let data = await response.json();
      let cityNameUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`;
      let cityNameResponse = await fetch(cityNameUrl);
      let cityNameData = await cityNameResponse.json();
      setWeather(data);
      setCityName(cityNameData[0].local_names.ko);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setAPIError(error.message);
      setLoading(false);
    }
  };

  const getWeatherByCity = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=kr`;
      let response = await fetch(url);
      let data = await response.json();
      let cityNameUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${OPENWEATHER_API_KEY}`;
      let cityNameResponse = await fetch(cityNameUrl);
      let cityNameData = await cityNameResponse.json();
      setWeather(data);
      setCityName(cityNameData[0].local_names.ko);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setAPIError(error.message);
      setLoading(false);
    }
  };

  const handleCityChange = (city) => {
    if (city === "current") {
      setCity("");
    } else {
      setCity(city);
    }
  };

  useEffect(() => {
    if (city === "") {
      setLoading(true);
      getCurrentLocation();
    } else {
      setLoading(true);
      getWeatherByCity();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  return (
    <div
      style={{
        background: `url(${import.meta.env.BASE_URL + "images/background.png"})`,
        backgroundSize: "cover",
        backgroundPosition: `center`,
        backgroundRepeat: `no-repeat`,
        height: `100vh`,
      }}
    >
      {loading ? (
        <div className="container">
          <ClipLoader
            color="#0e0b0a"
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : !apiError ? (
        <div className="container">
          <WeatherBox weather={weather} cityName={cityName} />
          <WeatherButton
            cities={cities}
            city={city}
            handleCityChange={handleCityChange}
          />
        </div>
      ) : (
        apiError
      )}
    </div>
  );
}

export default App;
