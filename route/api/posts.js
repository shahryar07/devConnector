const  express = require('express');
const  route = express.Router();

route.get('/' , (req , res) => {
    res.send('this is posts route');
});

module.exports = route;
