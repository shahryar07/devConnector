const  express = require('express');
const  route = express.Router();
const {check , validationResult} = require('express-validator');
const User = require('../../models/user')
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');


// User Registeration API
// Publically Accessable

route.post('/' , [check('name' , 'name is required').not().isEmpty() ,
    check('email' , 'email is required').isEmail() ,
    check('password' , 'password is required').not().isEmpty()
  ] ,
    async (req , res) => {
      try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()});
        }
        const {name , password , email} = req.body;

        //check if user exists
        let user = await User.findOne({email});
        if(user){
            const obj = [
              {
                statusCode: '400',
                message: 'Email Already Exits'
              }
            ]
            res.status(400).json(obj);

            return
        }
        user = new User({
            name,
            email,
            password
        })
        const salt = await bycrypt.genSalt(10);
        user.password = await bycrypt.hash(password , salt);
        await user.save();
        const obj = [{
            statusCode: 200,
            Message: 'User Registered Successfully'
        }];
        res.send(obj);

        // const payload = {
        //    user: {
        //        id: user.id
        //    }
        // };

        // jwt.sign(payload , config.get('jwtSecret'),
        //   {expiresIn : 360000},
        //   (err , token) =>{
        //      if(err) throw  console.log('err' , err);
        //       res.json({token})
        //   });


        return

    } catch (e) {
        console.log('error' , e);
        res.sendStatus(500).send(e);
        return
    }

});

module.exports = route;
