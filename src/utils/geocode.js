const request = require("request");

//optional parameters for mapbox api
const limit = 1;

const geocode = (address, callback) => {
  address = encodeURIComponent(address);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidmFyY2hhc3ZpIiwiYSI6ImNrNmNjdjExZzA5cXMzbnRmYnFiajhlMDIifQ.PKlUFHSlXRU4ZhPEE5KkXw&limit=${limit}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the location services", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find the searched location", undefined);
    } else {
      callback(undefined, {
        location: body.features[0].place_name,
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0]
      });
    }
  });
};

module.exports = geocode;
