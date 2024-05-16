const express = require('express');
const path = require('path');
const router = express.Router();

const authRoutes = require('./authRoutes');
const bookRoutes = require('./bookRoutes');
const authorize = require('../middleware/authorize');


//Authentication routes
router.use('/auth', authRoutes);

// Book routes
router.use('/books', bookRoutes);

//Serve html pages 
router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'register.html'));
});
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'login.html'));
});
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});



module.exports = router;
