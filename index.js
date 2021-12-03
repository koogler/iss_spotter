const { fetchMyIP } = require('./iss.js');

fetchMyIP((error, ipAddress) => {
  if (error) {
    console.log('Error fetch details:', error);
  } else {
    console.log('It worked! Your IP:', ipAddress);
  }
});