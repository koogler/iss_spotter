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

const fetchISSFlyOvertimes = function (coords, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (err, response, body) => {
    if (err) {
      callback(error, null);
      return;
    }
    const whereISS = JSON.parse(body).response
    callback(null, whereISS)
  })
}

const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, result) => {
    if (error) {
      return callback(error, null)
    }
    fetchMyCoordsByIP(result, (error, coords) => {
      if (error) {
        return callback(error, null)
      }

      fetchISSFlyOvertimes(coords, (error, whereISS) => {
        if (error) {
          return callback(error, null)
        }

        callback(null, whereISS)
      })
    })
  })
}



module.exports = { nextISSTimesForMyLocation };
