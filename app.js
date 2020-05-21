const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");
const PORT = 3030;
const dotenv = require("dotenv");
// setup dotenv options

dotenv.config({
  path: "./.env"
});

// to check server is working
app.get("/api", (request, response, next) => {
  response.send(`API Status: Running on ${PORT}`);
});
app.listen(PORT, "0.0.0.0");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
console.log("api key is", process.env.SENDGRID_API_KEY);
const msg = {
  to: "dsteven1@gmail.com",
  from: "test@example.com",
  subject: "Sending with Twilio SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>"
};

app.use(bodyParser.json());

app.use(cors());

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
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log("api key is", process.env.SENDGRID_API_KEY);
  sgMail.send(msg);
  response.send(`msg sent: ${msg.to}`);
});
