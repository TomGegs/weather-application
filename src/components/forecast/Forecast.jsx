import PropTypes from "prop-types";
import {
    Accordion,
    AccordionItemHeading,
    AccordionItem,
    AccordionItemPanel,
    AccordionItemButton,
} from "react-accessible-accordion";

import "./forecast.css";


const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const Forecast = ({ data }) => {

    Forecast.propTypes = {
        data: PropTypes.shape({
            list: PropTypes.arrayOf(
                PropTypes.shape({
                    weather: PropTypes.arrayOf(
                        PropTypes.shape({
                            icon: PropTypes.string.isRequired,
                            description: PropTypes.string.isRequired,
                        })
                    ).isRequired,
                    main: PropTypes.shape({
                        temp_min: PropTypes.number.isRequired,
                        temp_max: PropTypes.number.isRequired,
                        feels_like: PropTypes.number.isRequired,
                        humidity: PropTypes.number.isRequired,
                    }).isRequired,
                    clouds: PropTypes.shape({
                        all: PropTypes.number.isRequired,
                    }).isRequired,
                    wind: PropTypes.shape({
                        speed: PropTypes.number.isRequired,
                    }).isRequired,
                })
            ).isRequired,
        }).isRequired,
    };

    const dayInWeek = new Date().getDay();
    const forecastDaysInWeek = WEEK_DAYS.slice(
        dayInWeek,
        WEEK_DAYS.length
    ).concat(WEEK_DAYS.slice(0, dayInWeek));
    return (
        <>
            <label className="app__forecast-title">Daily</label>
            <Accordion allowZeroExpanded>
                {data.list.splice(0, 7).map((item, idx) => (
                    <AccordionItem key={idx}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className="app__forecast-info">
                                    <img
                                        alt="weather"
                                        className="app__forecast-info_icon"
                                        src={`icons/${item.weather[0].icon}.png`}
                                    />
                                    <label className="app__forecast-info_day">
                                        {forecastDaysInWeek[idx]}
                                    </label>
                                    <label className="app__forecast-info_description">
                                        {item.weather[0].description}
                                    </label>
                                    <label className="app__forecast-info_minmax">
                                        {Math.round(item.main.temp_min)}°C /{" "}
                                        {Math.round(item.main.temp_max)}°C
                                    </label>
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className="app__forecast-accordion">
                                <div className="app__forecast-accordion_item">
                                    <label>Feels Like</label>
                                    <label>{item.main.feels_like}°C</label>
                                </div>
                                <div className="app__forecast-accordion_item">
                                    <label>Humidity</label>
                                    <label>{item.main.humidity}%</label>
                                </div>
                                <div className="app__forecast-accordion_item">
                                    <label>Clouds</label>
                                    <label>{item.clouds.all}%</label>
                                </div>
                                <div className="app__forecast-accordion_item">
                                    <label>Wind Speed</label>
                                    <label>{item.wind.speed}m/s</label>
                                </div>
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </>
    );
};

export default Forecast;
