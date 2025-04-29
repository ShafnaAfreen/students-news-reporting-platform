const cloudinary = require('cloudinary').v2;

// Configure your cloud name, API key and API secret:

const myconfig = cloudinary.config({
  cloud_name: 'cloudname',
  api_key: 'apikey',
  api_secret: 'apisecret',
  secure: true
});

exports.myconfig = myconfig;
