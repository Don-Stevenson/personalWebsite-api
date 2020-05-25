const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Cors = require("cors");
const sgMail = require("@sendgrid/mail");
const PORT = 3030;
const dotenv = require("dotenv");

// setup dotenv options
dotenv.config({
  path: "./.env"
});

app.use(bodyParser.json());

app.use(Cors());

// to check server is working
//************************* */
app.get("/api", (request, response, next) => {
  response.send(`API Status: Running on ${PORT}`);
});
app.listen(PORT, "0.0.0.0", () => {
  console.log(`App listening on port ${PORT}!`);
});

// configure app
//*************** */
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
  console.log("api key is", process.env.SENDGRID_API_KEY2);

  //sets the apikey
  //************* */
  sgMail.setApiKey(process.env.SENDGRID_API_KEY2);

  //the message setup from the input fields of website- so as not error out twillio
  // make the default email my own, put the users email in the subject
  //************************************************ */
  const msg = {
    to: "dsteven1@gmail.com",
    from: "dsteven1@gmail.com",
    subject: request.body.email,
    text: request.body.text
  };

  //sending the email and catching any errors
  //**************************************** */
  // trying with async await

  async function sendMessage() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY2);
    try {
      await sgMail.send(msg);
      response.status(200).json({
        success: true
      });
    } catch (error) {
      console.log("error is: ", error);
      response.status(401).json({
        success: false
      });
    }
  }

  sendMessage();

});
