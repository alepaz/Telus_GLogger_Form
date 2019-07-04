const express = require('express'); //Common js modules server side
//import express from 'express' //this is named ES6 2015 MODULES, node doesn't support yet frontent side
const mongoose = require('mongoose');   //Facilitate comunicate with mongodb
const cookieSession = require('cookie-session');
const passport = require('passport'); //We want to tell passport to handle cookies
const keys = require('./config/keys');  //We require the file which is has the secret keys that are not commitment
const bodyParser = require('body-parser');
require('./models/User');   //Verify order of require statements
require('./models/Employee');
require('./services/passport'); //If you are not exporting anything, you can just use a require

//attempt to connect to mongodb
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();
//app is used to set up configuration that will listen for incoming requests that are being routed to the Express side

//Midleware for body parser, the incoming request for Stripe
app.use(bodyParser.json());

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
    app.use(express.static('client/build'));

    // Express will serve up the index.html file
    // If it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
