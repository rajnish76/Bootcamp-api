const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'mapquest',
  httpAdapter: 'https',
  apiKey: 'T8jX2uzCuug8H4t8KHK2oLvGTG4ksukh',
  formatter: null,
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
