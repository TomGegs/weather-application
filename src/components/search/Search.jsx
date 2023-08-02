import { useState } from "react";
import PropTypes from "prop-types";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions } from "../../api/api-geo-options";

const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState(null);

    Search.propTypes = {
        onSearchChange: PropTypes.func.isRequired,
    };

    const loadOptions = (inputValue) => {
        return fetch(
            `${
                import.meta.env.GEO_API_URL
            }/cities?countryIds=AU&namePrefix=${inputValue}`,
            geoApiOptions
        )
            .then((response) => response.json())
            .then((response) => {
                return {
                    options: response.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.regionCode}`,
                        };
                    }),
                };
            })
            .catch((err) => console.error(err));
    };

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    };

    return (
        <AsyncPaginate
            placeholder="Search for a city"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    );
};

export default Search;
