const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    app.post('/api/stripe', requireLogin, async (req, res) => {

        //Logic to handle the token and add credit
        //Req, represent the incoming request
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '5$ for 5 credits',
            source: req.body.id
        });
        //Set up automatically by passportjs
        req.user.credits += 5;
        const user = await req.user.save();

        res.send(user);
    });
};