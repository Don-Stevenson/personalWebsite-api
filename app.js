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
app.get("/api", (request, response, next) => {
  response.send(`API Status: Running on ${PORT}`);
});
app.listen(PORT, "0.0.0.0", () => {
  console.log(`App listening on port ${PORT}!`);
});
// testing out sgMail
// const msg = {
//   to: "dsteven1@gmail.com",
//   from: request.body.email,
//   subject: "Contact from website",
//   text: request.body.message
// };

// async function sendMessage() {
//   try {
//     console.log("api key is", process.env.SENDGRID_API_KEY);
//     sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//     await sgMail.send(msg);
//   } catch (err) {
//     console.log(err);
//   }
// }

// console.log(sendMessage());

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

  //the message setup from the input fields of website
  //************************************************ */
  const msg = {
    to: "dsteven1@gmail.com",
    from: "dsteven1@gmail.com",
    subject: "Contact from website",
    text: "hello"
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

  // trying with promises
  //   sgMail
  //     .send(msg)
  //     .then(result => {
  //       response.status(200).json({
  //         success: true
  //       });
  //     })
  //     .catch(err => {
  //       console.log("error is: ", err);
  //       response.status(401).json({
  //         success: false
  //       });
  // });
});
