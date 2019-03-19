import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
'use strict';
// to held generate sitemap
const fetch = require('node-fetch');
var aws = require('aws-sdk');
const cors = require('cors')({
    origin: true,
});

// var path = require("path");
// The Firebase Admin SDK to access the Firebase Realtime Database.
// const admin = require('firebase-admin');
// admin.initializeApp(functions.config().firebase);


const path = require('path')

// Provide the full path to your config.json file.
// let directory = path.dirname('aws-config.json');
// aws.config.loadFromPath(`./aws-config.json`);
aws.config.loadFromPath(path.join(__dirname, '..', 'aws-config.json'));

// Replace sender@example.com with your "From" address.
// This address must be verified with Amazon SES.
// const sender = "David <dheis24@gmail.com>";
const sender = "davidheis@hotmail.com";

// Replace recipient@example.com with a "To" address. If your account
// is still in the sandbox, this address must be verified.
const recipient = "dheis24@gmail.com";

// Specify a configuration set. If you do not want to use a configuration
// set, comment the following variable, and the
// ConfigurationSetName : configuration_set argument below.
// const configuration_set = "ConfigSet";

// The character encoding for the email.
const charset = "UTF-8";

// Create a new SES object.
var ses = new aws.SES();


// firestore
const admin = require('firebase-admin');
// const serviceAccount = require("./service-key.json");
const serviceAccount = require(path.join(__dirname, '..', 'service-key.json'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://brighthill-ssr.firebaseio.com"
});
// var db = admin.database();

exports.generateSitemap = functions.https.onRequest((req, res) => {
    const articlesData = fetch('https://brighthill-ssr.firebaseio.com/articles.json');
    // const lessonsData = fetch('https://ffgl-b118d.firebaseio.com/lessons.json');

    let sitemap = 'https://brighthilllawyers.com/\nhttps://brighthilllawyers.com/about\nhttps://brighthilllawyers.com/services\nhttps://brighthilllawyers.com/contact\n';

    // Promise.all([
    articlesData.then(result => result.json())
        // lessonsData.then(result => result.json()),
        // ])
        .then(articlesData => {
            // const capos = jsonData[0];
            // const lessons = jsonData[1];

            for (const key in articlesData) {
                const name = encodeURIComponent(articlesData[key].product.seoFriendlyTitle);
                sitemap += `https://brighthilllawyers.com/articles/${name}/show/${key}\n`;
            }

            // lessons.array.forEach(lesson => {
            // for (const key in lessons) {
            //     const title = encodeURIComponent(lessons[key].seoFriendlyTitle);
            //     sitemap += `https://freeflamencoguitarlessons.com/lessons/${title}/show/${key}\n`
            // }
            // });

            return res.send(sitemap);
        })
        .catch(err => {
            res.send({ msg: 'Error generating sitemap', error: err });
        });
});

exports.contactPage = functions.https.onRequest((req, res) => {

    // The subject line for the email.
    const subject = "Contact page Brighthill Lawyers ";

    const body_text = `
    Please don't respond to this email.
    Please copy the following email address and create a new email.
  Email: ${req.query.contactPageEmail}
  Name: ${req.query.name}
  Subject: ${req.query.subject}
  Message: ${req.query.message}
  -- email from brighthilllawyers.com contact page.`;

    const body_html = `<html>
<head></head>
<body>
<p>Please don't respond to this email.</p>
<p>Please copy the following email address and create a new email.</p>
  <p>
  Email: ${req.query.contactPageEmail}<br>
  Name: ${req.query.name}<br>
  Subject: ${req.query.subject}<br>
  Message: ${req.query.message}<br>
  -- email from brighthilllawyers.com contact page </p>
</body>
</html>`;

    var params = {
        Source: sender,
        Destination: {
            ToAddresses: [recipient]
        },
        Message: {
            Subject: {
                Data: subject,
                Charset: charset
            },
            Body: {
                Text: {
                    Data: body_text,
                    Charset: charset
                },
                Html: {
                    Data: body_html,
                    Charset: charset
                }
            }
        }
        // ConfigurationSetName: configuration_set
    };
    // cors allows origin access, prevents no access errors
    cors(req, res, () => {
        //Try to send the email.
        ses.sendEmail(params, (err, data) => {
            // If something goes wrong, print an error message.
            if (err) {
                console.log(err.message);
                res.status(400).send(err.message);
            } else {
                console.log("Email sent! Message ID: ", data.MessageId);
                res.status(200).end();
            }
        });
    });
});



export const universal = functions.https.onRequest((request, response) => {
    require(`${process.cwd()}/dist/brighthill-ssr-webpack/server`).app(request, response);
});