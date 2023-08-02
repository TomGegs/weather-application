
// This file contains the options for the geoApi

export function geoApiOptions() {
  return {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": import.meta.X_RAPIDAPI_KEY,
      "X-RapidAPI-Host": import.meta.X_RAPIDAPI_HOST,
    },
  };
}
