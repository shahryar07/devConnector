const  express = require('express');
const {check} = require("express-validator");
const  route = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/user')
route.get('/' , auth , async  (req , res) => {

});

module.exports = route;

