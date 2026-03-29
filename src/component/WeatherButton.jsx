import Button from "react-bootstrap/Button";

const WeatherButton = ({ cities, city, handleCityChange }) => {
  return (
    <div className="btn-container">
      <Button
        className="btn"
        variant={`${city === "" ? "warning" : "outline-warning"}`}
        onClick={() => handleCityChange("current")}
      >
        현재 위치
      </Button>
      {cities.map((item, index) => {
        return (
          <Button
            className="btn"
            variant={`${city === item ? "warning" : "outline-warning"}`}
            key={index}
            onClick={() => handleCityChange(item)}
          >
            {item}
          </Button>
        );
      })}
    </div>
  );
};

export default WeatherButton;
