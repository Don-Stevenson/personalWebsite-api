const express = require("express");
const app = express();
const bodyParser = require("bodyParser");
const cors = require("cors");
const sendGrid = require("@sendgrid/mail");

app.use(bodyParser.json());

app.use(cors());

app.use((request, response, next) => {
  request.setHeader("Acess-Control-Allow-Origin", "*");
  request.setHeader(
    "Acess-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  request.setHeader(
    "Acess-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
});
