const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Employee = mongoose.model('employees');

module.exports = app => {
    app.get('/api/surveys', requireLogin, async (req, res) => {
        const surveys = await Employee.find({ _user: req.user.id });

        res.send(surveys);
    });

    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for voting!');
    });

    app.post('/api/surveys/webhooks', (req, res) => {

        const p = new Path('/api/surveys/:surveyId/:choice');
        //console.log(req.body);
        _.chain(req.body)
            .map(({ email, url }) => {
                const match = p.test(new URL(url).pathname);
                if(match) {
                    return { email, surveyId: match.surveyId, choice: match.choice };
                }
            })
            .compact()
            .uniqBy('email', 'surveyId')
            .each(({ surveyId, email, choice }) => {
                Survey.updateOne(
                  {
                    _id: surveyId,
                    recipients: {
                      $elemMatch: { email: email, responded: false }
                    }
                  },
                  {
                    $inc: { [choice]: 1 },
                    $set: { 'recipients.$.responded': true },
                    lastResponded: new Date()
                  }
                ).exec();
              })
            .value();

        res.send({});
    });

    //app.post('/api/surveys', requireLogin, async (req, res) => {
    app.post('/api/surveys', async (req, res) => {
        const { department, position, site, country, supervisor, firstName, secondName, lastName, email } = req.body;
        console.log(req.body);
        const employee = new Employee({
            employeeID: "91056658",
            department,
            costCenter: "CC-999-VOXP",
            position,
            site,
            country,
            supervisorID: supervisor,
            firstName,
            secondName,
            lastName,
            email
        });

        try{
            //Every process is going to be paused until the await process is not complete
            await employee.save();
            //Send update user
            res.send(employee);
        }catch(err){
            //Unprocessable entity, which means bad data
            res.status(422).send(err);
        }
    });
};