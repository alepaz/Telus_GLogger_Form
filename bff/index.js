const express = require('express'); //Common js modules server side
//import express from 'express' //this is named ES6 2015 MODULES, node doesn't support yet frontent side
const mongoose = require('mongoose');   //Facilitate comunicate with mongodb
const cookieSession = require('cookie-session');
const passport = require('passport'); //We want to tell passport to handle cookies
const keys = require('./config/keys'); //We require the file which is has the secret keys that are not commitment
const mongooseOptions = require('./config/mongooseOptions') 
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
require('./models/User');   //Verify order of require statements
require('./models/Employee');
require('./models/Counter');
require('./services/passport'); //If you are not exporting anything, you can just use a require

const options = {
  key  : fs.readFileSync(__dirname + '/SSL/wildcard.telusinternational.com.key'),
  cert : fs.readFileSync(__dirname + '/SSL/star_telusinternational_com.crt')
};

const app = express();
//app is used to set up configuration that will listen for incoming requests that are being routed to the Express side

//Midleware for body parser, the incoming request for Stripe
app.use(bodyParser.json());

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
//To enable cookies and tell express to be aware
app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000, //How long this cookie will be alive
      keys: [keys.cookieKey]    //To encrypt the cookie

    })
    );
    
    app.use(passport.initialize());
    app.use(passport.session());
    
    require('./routes/authRoutes')(app);
    require('./routes/billingRoutes')(app);
    require('./routes/surveyRoutes')(app);
    
    if (process.env.NODE_ENV === 'production') {
      // Express will serve up production assets
      // Like our main.js file or main.css file
      app.use(express.static('ui/build'));
      
      // Express will serve up the index.html file
      // If it doesn't recognize the route
      const path = require('path');
      app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'ui', 'build', 'index.html'));
      });
}

// database
const db = mongoose.connection;
let connectionRetries = 1;
let reconnectionTimeout;

const connectMongoose = () => {
  try {
    clearTimeout(reconnectionTimeout);
    mongoose.connect(keys.mongoURI, mongooseOptions).then(
      () => {},
      err => {
        console.error(`${connectionRetries} - Mongodb connection rejected at ${keys.mongoURI}. Retrying in 5 sec.`, err);
        connectionRetries += 1;
        mongoose.disconnect();
        reconnectionTimeout = setTimeout(connectMongoose, 5000);
      }
    );
  } catch (err) {
    console.error('Error trying to connect to mongodb', err);
  }
};

connectMongoose();

db.once('open', () => {
  console.info('Mongodb connection open...');
});

const PORT = process.env.PORT || 20000;

https.createServer(options, app).listen(PORT);

process.on('SIGINT', () => {
  db.close(() => {
    console.info('Mongoose default connection disconnected through app termination');
    process.exit();
  });
});
