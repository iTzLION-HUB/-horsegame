var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Datastore = require('nedb');
const fs = require('fs');
const horses = require("./horses.json");
const tracks = require("./tracks.json");
const weather = require("./weather.json");
const time = require("./time.json");
const settings = require("./settings.json");
const raceDistance = require("./raceDistance.json");
const sampleOutput = require("./sampleOutput.json");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(logger('dev'));
app.use(express.json({
  limit: '1mb'
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// const horseDB = new Datastore('horseProperties.db');
// horseDB.loadDatabase();
const testData = []; 
// console.log(horses.horse[3]);
// console.log(tracks.track[1]);
// console.log(weather[1]);
// console.log(settings);
// console.log(time[1]);
console.log(sampleOutput.session1.race1.eventID);
var randomNum = 2;

const weatherString = weather[randomNum].weather;
const timeString = time[randomNum].time;
const trackData = tracks.track[1];
const raceDistanceString = raceDistance[1].raceDistance;
//const raceDetails = {"weather" : weatherString, "trackData" : trackData, "time" : timeString};
var raceDetails = {};

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function generateRaceData(){
  for(var i = 0; i<settings.totalDailySessions; i++){
    var sessionNum = "session"+i;
    raceDetails += {"session" : sessionNum};
    for(var j = 0; j<settings.racesPerSession; j++){
      console.log("checking Loop");
    }
  }
  const rndInt = randomIntFromInterval(settings.minHorses, settings.maxHorses)
  console.log("randInt " + rndInt);
}

app.get('/raceList', (req, res) => {
  // generateRaceData();
  res.json(sampleOutput);
});

app.get('/horsesList', (req, res) => {  
  res.json(horses);
});

app.get('/gameSettings', (req, res) => {  
  res.json(settings);
});

app.get('/tracksList', (req, res) => {  
  res.json(tracks);
});

app.get('/weatherTypes', (req, res) => {  
  res.json(weather);
});

app.get('/envTimes', (req, res) => {  
  res.json(time);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = process.env.PORT || 5000;
app.listen(port);
console.log(`Listening on Port ${port}`);
module.exports = app;
