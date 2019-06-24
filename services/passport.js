//Configuration for passport inside our application
const passport = require('passport'); //Express the idea how to authetificate
const GoogleStrategy = require('passport-google-oauth20').Strategy; //Instruct passport how to authenticate with google
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);    //No profile.id, id from db, because we can't assume the same origin Google
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
        callbackURL: '/auth/google/callback',
        proxy: true
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                //When we fetch the database, we use a asynchrous process which return a promise
                const existingUser = await User.findOne({ googleID: profile.id })
                if (existingUser) {
                    //We already have a record with the given profile ID
                    return done(null, existingUser); //First argument it's an air object
                    //Air object: Communicates back to a passport that maybe something went wrong, but if we find the user everything is fine
                }
                //We don't have a user record with this ID, make a new record
                const user = await new User({ googleID: profile.id, name: profile.displayName }).save()
                done(null, user);
                //every operation to db is asynchrous
                
            } catch (error) {
                console.log(error);
            }
        })
); //We need to tell passport how to use GoogleStrategy, GoogleStrategy needs a configuration
