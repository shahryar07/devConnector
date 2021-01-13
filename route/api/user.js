const  express = require('express');
const  route = express.Router();
const {check , validationResult} = require('express-validator/check');
const User = require('../../models/User')
// @route POST api/users
// @deso  Register User
// @access Public

route.post('/' , [check('name' , 'Name is required').not().isEmpty() ,check('email' , 'email is required').isEmail() ] ,
    async (req , res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }


    const {name , password , email} = req.body;

    try {
        //check if user exists
        // get user gravatar
        // encrtypt password
        // return json webtoken

    } catch (e) {
        console.log('error' , e);
        res.send(500).send('Server Error');
    }











    console.log('this is req' , req.body);
    res.send('this is user route');
});

module.exports = route;
