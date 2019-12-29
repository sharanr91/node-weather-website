const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url = `https://api.darksky.net/forecast/587ae3ca40d70085407277a6a97efdd0/${latitude},${longitude}?lang=en&units=auto`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to fetch the forecast services at the moment");
    } else if (body.error) {
      callback("Please provide the correct longitude and latitude values");
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          ` It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain.
          Today's high is ${body.daily.data[0].temperatureHigh}, and low is ${body.daily.data[0].temperatureLow}`
      );
    }
  });
};

module.exports = forecast;
