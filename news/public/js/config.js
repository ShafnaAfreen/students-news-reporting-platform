const cloudinary = require('cloudinary').v2;

// Configure your cloud name, API key and API secret:

const myconfig = cloudinary.config({
  cloud_name: 'dpz1hvykp',
  api_key: '434752942583556',
  api_secret: 'UJb033esUOJ7gFe5itCviX4OtPg',
  secure: true
});

exports.myconfig = myconfig;