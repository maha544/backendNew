const express = require("express");
const route = express.Router();

const authcontroller = require("../controllers/authcontroller");


route.post('/signup', authcontroller.signup);
route.post('/login', authcontroller.login);


module.exports = route;