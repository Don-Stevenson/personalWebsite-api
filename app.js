const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Cors = require("cors");
const sgMail = require("@sendgrid/mail");
const PORT = 3030;
const dotenv = require("dotenv");

// setup dotenv options
// ********************
dotenv.config({
  path: "./.env",
});

// app configurations
// ******************
app.use(bodyParser.json());
app.use(Cors());

// to check that the server is working
// ***********************************
app.get("/api", (request, response, next) => {
  response.send(`API Status: Running on ${PORT}`);
});
app.listen(process.env.PORT || 3000, () => {
  console.log(`App listening on port ${PORT}!`);
});

// configure app
// *************
app.use((request, response, next) => {
  response.setHeader("Acess-Control-Allow-Origin", "*");
  response.setHeader(
    "Acess-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  response.setHeader(
    "Acess-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  next();
});

app.post("/api/email", (request, response, next) => {
  // sets the apikey
  // ***************
  sgMail.setApiKey(process.env.SENDGRID_API_KEY2);

  // bring in my email from the.env file
  // ***********************************
  const myEmail = process.env.MY_EMAIL;

  // the message setup from the input fields of website- so as not error out twillio
  // make the default email my own, put the users email in the subject and in the text as reply to
  // *********************************************************************************************
  const msg = {
    to: myEmail,
    from: myEmail,
    subject: `personal website email from ${request.body.name} email is ${request.body.email}`,
    text: `name: ${request.body.name}
    message: ${request.body.message} 
    reply to ${request.body.email}`,
  };

  // sending the email and catching any errors
  // *****************************************
  // updated with async await

  async function sendMessage() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY2);
    try {
      await sgMail.send(msg);
      response.status(200).json({
        success: true,
      });
    } catch (error) {
      console.log("error is: ", error);
      response.status(401).json({
        success: false,
      });
    }
  }
  // Console log the message for development purposes
  // ************************************************
  sendMessage();
  console.log("Message is : ", msg);
});
