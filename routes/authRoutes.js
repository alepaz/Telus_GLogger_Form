const passport = require('passport');

//We are going to assume a call from index.js
module.exports = (app) => {

    app.get(
        '/auth/google', 
        passport.authenticate('google', {   //Google parameter is what GoogleOath20 is waiting to raise in passport
        scope: ['profile', 'email']         //To specify Google Server, what we want access
    }));

    //Route handle for google oauth success (callback)
    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),      //Passport strategy -google oauth20- will handle the information received
        (req, res) => { //Where is going to be sent after the passport authenticate
            res.redirect('/employees');
        }
    );

    app.get(
        '/api/logout',
        (req, res) => {
            req.logout();   //logout is a function that is attached automatically to the request object by passport
            //res.send(req.user); //This prove to whoever is making this request that they are no longer signed
            res.redirect('/');
    });

    //Route to revise currently cookie
    app.get(
        '/api/current_user',
        (req, res) => { //Req: incoming request, Res: outgoing request 
            res.send(req.user);
        });

};