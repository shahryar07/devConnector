const moongose = require('mongoose');

const UserSchema = new moongose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },

    date: {
       type: String,

    },
    avatar: {
        type: String
    }
});

module.exports = User = moongose.model('user' , UserSchema)
