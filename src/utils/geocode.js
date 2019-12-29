const request = require("request");

const getGeoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?limit=2&access_token=pk.eyJ1IjoidXNlcmZvcm5vZGUiLCJhIjoiY2s0Y24xdGc4MDA5ejNrcWNkeW4xNnptMSJ9.gWoieU1YAHdSzUiU2ZNy1w&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to fetch geo location services");
    } else if (body.features.length < 1) {
      callback("Please do a spell check of the location provided");
    } else {
      callback(undefined, {
        logitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = getGeoCode;
