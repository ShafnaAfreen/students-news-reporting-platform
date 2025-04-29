const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const signuploadwidgetRouter = require('./routes/signuploadwidget')

dotenv.config();

const app = express();
app.use(express.json());
// Set up middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));


const cloudName = cloudinary.config().cloud_name;
const apiKey = cloudinary.config().api_key;


app.use('/api/signuploadwidget', signuploadwidgetRouter)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'index.html'));
});


app.get('/loginparent', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'loginparent.html'));
});

app.get('/loginjournalist', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'loginjournalist.html'));
});

app.get('/loginuser', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'loginuser.html'));
});

app.get('/uploadwidget', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'uploadwidget.html'));
});

app.get('/user', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'user.html'));
});

app.get('/journalist', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'journalist.html'));
});

app.get('/parent', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'parent.html'));
});

app.get('/views/announcements.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'announcements.html'));
});

app.get('/views/announcements.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'announcements.html'));
});

// Server setup
const PORT = 5501;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
