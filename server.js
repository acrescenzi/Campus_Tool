const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('src')); // Serve static files from ../public
app.use('/api', require('./api')); // Serve our api
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.listen(process.env.PORT || 8080);
