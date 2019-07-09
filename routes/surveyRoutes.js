const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const mongoose = require('mongoose');
const csv = require('csv-express');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Counter = mongoose.model('counters');
const Employee = mongoose.model('employees');

module.exports = app => {
    app.get('/api/employees', requireLogin, async (req, res) => {
        const employees = await Employee.find();
        res.send(employees);
    });

    app.get('/api/employees/top', requireLogin, async (req, res) => {
        const employees = await Employee.find().sort({$natural:-1}).limit(10);
        res.send(employees);
    });

    app.get('/api/employees/csv', requireLogin, async (req, res) => {
        const filename   = "employees.csv";
        const employees = await Employee.find().lean();
        console.log(employees);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader("Content-Disposition", 'attachment; filename='+filename);
        res.csv(employees, true);
        res.send('Thanks for voting!');
    });

    async function getNextSequenceValue(sequenceName){
        //It's supoosed to be a increment of 1, but idk why it's trigger again in the console.log(doc)
        const sequenceDocument = await Counter.findOneAndUpdate(
            {_id: sequenceName },
            {$inc:{sequence_value:0.5}},
            {new: true},
            (err, doc) => {
                if (err) {
                    console.log("Something wrong when updating data!");
                }
                console.log(doc);
            });
        return sequenceDocument.sequence_value;
     }

    app.post('/api/employees/webhooks', (req, res) => {

        const p = new Path('/api/employees/:surveyId/:choice');
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

    //app.post('/api/employees', requireLogin, async (req, res) => {
    app.post('/api/employees', async (req, res) => {
        const { department, position, site, country, supervisor, firstName, secondName, lastName, email } = req.body;
        try{

            const fakeWorkdayID = await getNextSequenceValue("employeeID");
        
            const employee = new Employee({
                employeeID: fakeWorkdayID,
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
        
            //Every process is going to be paused until the await process is not complete
            await employee.save();
            //Send update user
            res.send(employee);
        }catch(err){
            //Unprocessable entity, which means bad data
            console.log(err);
            res.status(422).send(err);
        }
    });
};