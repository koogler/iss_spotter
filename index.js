const { fetchMyIP, fetchISSFlyOvertimes } = require('./iss.js');
const { fetchMyCoordsByIP } = require('./iss.js');

const myIP = fetchMyIP((error, ipAddress) => {
  if (error) {
    console.log('Error fetch details:', error);
  } else {
    console.log('It worked! Your IP:', ipAddress);
  }
});

const myCoords = fetchMyCoordsByIP('174.94.2.57', (error, coords) => {
  if (error) {
    console.log('Error fetch details:', error);
  } else {
    console.log('It worked! Your coordinates are:', coords);
  }
})
const latAndLong = { latitude: 43.6909, longitude: -79.3098 }
const issFlyTimes = fetchISSFlyOvertimes(latAndLong, (error, timing) => {
  if (error) {
    console.log('Error fetch details:', error);
  } else {
    console.log('Here are your fly over times:', timing)
  }
})