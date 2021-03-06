require("dotenv").config()

const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors')

const app = express();
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json());
const port = process.env.PORT || 8080

// Middleware
app.use(express.json()); // parse json bodies in the request object
app.use(cors())

// Redirect requests to endpoint starting with /api to index.js
const api = require('./routes/index');
app.use('/api/', api);

// Global Error Handler
app.use((err, req, res, next) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);

    res.status(500).json({
        message: "Something went really wrong",
    });
});

const server = app.listen(port, () => {
    console.log(`running on port ${port}`);
});
