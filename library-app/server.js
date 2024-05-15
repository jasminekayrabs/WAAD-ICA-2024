require('dotenv').config();
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

//Database and middleware imports
const pool = require('./db');
const authorize = require('./middleware/authorize');
const multer = require('./middleware/multer');

//Route handler
const apiRoutes = require('./routes/api');

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Serving static files.
app.use(express.static('public'));

//Using API routes
app.use('/api', apiRoutes);

//
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
