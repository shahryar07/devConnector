const  express = require('express');
const  route = express.Router();
const {check , validationResult} = require('express-validator');
const User = require('../../models/User')
const bycrypt = require('bcryptjs');
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
        let user = await User.findOne({email});

        if(user){
            res.status(400).json();
        }
        // get user gravatar
        const avatar = gravatar.url(email , {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        user = new User({
            name,
            email,
            avatar,
            password
        })

        const salt = await bycrypt.genSalt(10);
        user.password = await bycrypt.hash(password , salt);
        await user.save();
        // encrtypt password

        // return json webtoken

        res.send('user registerd successfully');

    } catch (e) {
        console.log('error' , e);
        res.sendStatus(500).send('Server Error');
    }











    console.log('this is req' , req.body);
    res.send('this is user route');
});

module.exports = route;
