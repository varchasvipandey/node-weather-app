const request = require("request");

//optional parameters for darksky api
const unit = "si";
const lang = "en";

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/96aa63f83d7b5c973e2db5780cb33e35/${latitude},${longitude}?units=${unit}&lang=${lang}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the server", undefined);
    } else if (body.error) {
      callback("Unable to locate the searched co-ordinates", undefined);
    } else {
      callback(undefined, {
        summary: body.daily.data[0].summary,
        temperature: body.currently.temperature,
        rainProb: body.currently.precipProbability
      });
    }
  });
};

module.exports = forecast;
