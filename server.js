const express = require('express');
const app = express();
const connectDB = require('./config/db');
const userRoute = require('./route/api/user');
const authRoute = require('./route/api/auth');
const profileRoute = require('./route/api/profile');
const postRoutes = require('./route/api/posts');
connectDB();

// init middleware

app.use(express.json({extended: false}))

const obj = {
    name: 'Shahryar',
    email: 'shahryar07ahmad@gmail.com',
    age: '27',
    designation: 'frontend developer'
}

app.get('/' , (req , res) => res.send(obj));
app.use('/api/users' , userRoute);
app.use('/api/auth' , authRoute);
app.use('/api/profile' , profileRoute);
app.use('/api/posts' , postRoutes);
const PORT = process.env.PORT || 5000;

// Defining routes here




app.listen(PORT , () =>  console.log(`server started on port  ${PORT}`));
