/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');

const fetchMyIP = function (callback) {
  request('https://api.ipify.org?format=json', (err, response, body) => {
    let interetProtocol = JSON.parse(body);
    if (err) {
      return callback(err, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    if (!err) {
      let result = interetProtocol['ip'];
      return callback(null, result);
    }
  });
};

const fetchMyCoordsByIP = function (ip, callback) {
  request('https://api.freegeoip.app/json/?apikey=d145aae0-53db-11ec-88a5-a946c7810142', (err, response, body) => {
    if (err) {
      return callback(err, null);
    }
    if (!err) {
      const { latitude, longitude } = JSON.parse(body);
      return callback(null, { latitude, longitude })
    };
  })
}

module.exports = { fetchMyIP, fetchMyCoordsByIP };
