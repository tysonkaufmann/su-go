// IMPORT PACKAGES.
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // Connects to mongodb.

require('dotenv').config();

//Create express server.
const app = express();
const port = process.env.PORT || 5000;

// Parse JSON ( SENDS AND RECEIVE JSON )
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

// USER ROUTE
const usersRouter = require('./routes/user');
app.use('/api/user', usersRouter);
// ROUTES ROUTE
const routesRouter = require('./routes/routes');
app.use('/api/routes', routesRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

module.exports = app
