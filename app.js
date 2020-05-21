const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const sendGrid = require("@sendgrid/mail");
const PORT = 3030;

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


// to check server is working
app.get("/api", (request, response, next) => {
  response.send(`API Status: Running on ${PORT}`);
});
app.listen(PORT, "0.0.0.0");

app.post('/api/email', (request,response,next)=>{
    sendGrid.setApiKey('')
})