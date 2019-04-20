// server.js

let express = require('express');
let path = require('path');
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let app = express;



// Routes
// =============================================================
// HTML ROUTES
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/survey', function (req, res) {
    res.sendFile(path.join(__dirname, 'survey.html'));
});


// API ROUTES
app.get('/api/friends', function (req, res) {
    
});

app.post('/api/friends', function (req, res) {
   
});



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

