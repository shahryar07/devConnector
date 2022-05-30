const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI')
const connectDB = async () => {
    try{
        await mongoose.connect(db , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            userCreateIndex: true
        });
        console.log('db connected nice');
    } catch (e) {
         console.log(e);
         process.exit(1);
    }
}
module.exports = connectDB;
