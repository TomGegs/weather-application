import CurrentWeather from "../currentWeather/currentWeather";
import Forecast from "../forecast/forecast";
import Search from "../search/Search";

import { useState } from "react";

const Wrapper = () => {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecastWeather, setForecastWeather] = useState(null);

    const handleOnSearchChange = (searchData) => {
        const [lat, lon] = searchData.value.split(" ");

        const currentWeatherFetch = fetch(
            `${
                import.meta.env.import.meta.env.WEATHER_API_URL
            }/weather?lat=${lat}&lon=${lon}&appid=${
                import.meta.env.WEATHER_API_KEY
            }&units=metric`
        );

        const forecastWeatherFetch = fetch(
            `${
                import.meta.env.WEATHER_API_URL
            }/forecast?lat=${lat}&lon=${lon}&appid=${
                import.meta.env.WEATHER_API_KEY
            }&units=metric`
        );

        Promise.all([currentWeatherFetch, forecastWeatherFetch])
            .then(async (response) => {
                const weatherResponse = await response[0].json();
                const forecastResponse = await response[1].json();

                setCurrentWeather({
                    city: searchData.label,
                    ...weatherResponse,
                });
                setForecastWeather({
                    city: searchData.label,
                    ...forecastResponse,
                });
            })
            .catch((err) => console.log(err));
    };

    console.log(currentWeather);
    console.log(forecastWeather);

    return (
        <div className="container">
            <Search onSearchChange={handleOnSearchChange} />
            {currentWeather && <CurrentWeather data={currentWeather} />}
            {forecastWeather && <Forecast data={forecastWeather} />}
        </div>
    );
};

export default Wrapper;
