const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const userRoutes = require('./app/routes/user')
const gameRoutes = require('./app/routes/game')
// Mongo URL
const URI = "";
mongoose.connect(
    URI,
    {
        useUnifiedTopology: true, 
        useNewUrlParser: true 
    }
);

mongoose.Promise = global.Promise;


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// make this folder public
app.use('/uploads',express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/user", userRoutes)

app.use("/game", gameRoutes)

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
