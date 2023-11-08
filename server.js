/**
 * This is server.js which is used to manage the restAPI
 */

const express = require("express");
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express(); 
const env = process.env.NODE_ENV || "development";

if(env === "test"){
    process.env.MONGODB_URI = process.env.DB_CONNECTION_TEST
} else {
    process.env.MONGODB_URI = process.env.DB_CONNECTION
}

/**
 * Main routes of the API
 */
const bookRoute = require("./routes/book");


/* MIDDLEWARE */
app.use(cookieParser());
const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
};

app.use(cors(corsOptions));
app.use(bodyParser.json()); // applying bodyparser


app.use('/api/books', bookRoute);

app.use(function(req, res, next) {
    const error = new Error("Not found in the api");
    error.status = 404;
    next(error); 
});

/* For all other types of error we come here */

app.use(function(error, req, res, next) {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
});  

app.listen('3000', function() {
    console.log("The database started"); 
});