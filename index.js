const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const habitRoutes = require('./routes');
const db = require('./db');
const path = require('path');

app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');

// Serve static files from the "css" folder
app.use(express.static(path.join(__dirname, 'css')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', habitRoutes);

app.listen(8000, function () {
    console.log('Server Started');
});
