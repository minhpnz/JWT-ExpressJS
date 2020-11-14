const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts')
dotenv.config();
mongoose.connect("mongodb+srv://admin:1234@cluster0.zsgzp.mongodb.net/users?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log(process.env.DB_CONNECT));
//Import Routes
//Middlewares
app.use(express.json())
//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/user', postRoute);
app.listen(3001, () => console.log("listen to port 3001"));