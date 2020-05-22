//To Test out sgGrid
//******************/

const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");

dotenv.config({
  path: "./.env"
});

// console.log("api key is", process.env.SENDGRID_API_KEY1);

//sets the apikey
//************* */
// sgMail.setApiKey(process.env.SENDGRID_API_KEY1);

//the message setup from the input fields of website
//************************************************ */
const msg = {
  to: "dsteven1@gmail.com",
  from: "dsteven1@gmail.com",
  subject: "Hi Don",
  text: "Your're great, I love you"
};

async function sendMessage() {
  try {
    //sets the apikey
    //************* */
    sgMail.setApiKey(process.env.SENDGRID_API_KEY2);
    console.log("message is", msg);
    console.log("api key is", process.env.SENDGRID_API_KEY2);
    await sgMail.send(msg);
  } catch (error) {
    console.log(error);
  }
}

sendMessage();
