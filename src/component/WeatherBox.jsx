const WeatherBox = ({ weather, cityName }) => {
  const celsius = weather?.main.temp.toFixed(0);
  const fahrenheit = (celsius * 1.8 + 32).toFixed(0);
  const weatherDescription = weather?.weather[0].description;
  const weatherIcon = weather?.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/wn/${weatherIcon}.png`;

  return (
    <div className="weather-box">
      <h3 className="m-0">{cityName}</h3>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        <h3 className="m-0">
          <span>{celsius}°C</span> / <span>{fahrenheit}°F</span>
        </h3>
      </div>
      <div className="weather-info">
        <h6 className="m-0">{weatherDescription}</h6>{" "}
        <img src={iconUrl} alt="weather icon" />
      </div>
    </div>
  );
};

export default WeatherBox;
