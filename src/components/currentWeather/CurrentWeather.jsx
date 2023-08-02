import PropTypes from "prop-types";

import "./currentWeather.css";

const CurrentWeather = ({ data }) => {
    CurrentWeather.propTypes = {
        data: PropTypes.shape({
            city: PropTypes.string.isRequired,
            weather: PropTypes.arrayOf(
                PropTypes.shape({
                    icon: PropTypes.string.isRequired,
                    description: PropTypes.string.isRequired,
                })
            ).isRequired,
            main: PropTypes.shape({
                temp: PropTypes.number.isRequired,
                feels_like: PropTypes.number.isRequired,
                humidity: PropTypes.number.isRequired,
            }).isRequired,
            wind: PropTypes.shape({
                speed: PropTypes.number.isRequired,
            }).isRequired,
            sys: PropTypes.shape({
                sunrise: PropTypes.number.isRequired,
                sunset: PropTypes.number.isRequired,
            }).isRequired,
        }).isRequired,
    };

    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString(
        "en-AU",
        { hour: "2-digit", minute: "2-digit" }
    );
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString(
        "en-AU",
        { hour: "2-digit", minute: "2-digit" }
    );

    return (
        <div className="app__weather-wrapper">
            <div className="app__weather-top">
                <div>
                    <p className="app__weather-top_city">{data.city}</p>
                    <p className="app__weather-top_description">
                        {data.weather[0].description}
                    </p>
                </div>
                <img
                    className="app__weather-top_icon"
                    src={`icons/${data.weather[0].icon}.png`}
                    alt="weather-icon"
                />
            </div>

            <div className="app__weather-bottom">
                <p className="app__weather-bottom_temperature">
                    {Math.round(data.main.temp)}°C
                </p>
                <div className="app__weather-bottom_details">
                    <div className="app__weather-bottom_details-row">
                        <span className="app__weather-bottom_details-row_header">
                            Details:
                        </span>
                    </div>
                    <div className="app__weather-bottom_details-row">
                        <span className="app__weather-bottom_details-row_label">
                            Feels Like
                        </span>
                        <span className="app__weather-bottom_details-row_value">
                            {Math.round(data.main.feels_like)}°C
                        </span>
                    </div>
                    <div className="app__weather-bottom_details-row">
                        <span className="app__weather-bottom_details-row_label">
                            Wind
                        </span>
                        <span className="app__weather-bottom_details-row_value">
                            {data.wind.speed}m/s
                        </span>
                    </div>
                    <div className="app__weather-bottom_details-row">
                        <span className="app__weather-bottom_details-row_label">
                            Humidity
                        </span>
                        <span className="app__weather-bottom_details-row_value">
                            {Math.round(data.main.humidity)}%
                        </span>
                    </div>
                    <div className="app__weather-bottom_details-row">
                        <span className="app__weather-bottom_details-row_label">
                            Sunrise
                        </span>
                        <span className="app__weather-bottom_details-row_value">
                            {sunrise}
                        </span>
                    </div>
                    <div className="app__weather-bottom_details-row">
                        <span className="app__weather-bottom_details-row_label">
                            Sunset
                        </span>
                        <span className="app__weather-bottom_details-row_value">
                            {sunset}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentWeather;
