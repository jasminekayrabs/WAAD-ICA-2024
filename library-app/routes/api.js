//File to better organise the routes
const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const bookRoutes = require('./bookRoutes');

//Serve html pages for login and register
router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'register.html'));
});
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'login.html'));
});

router.use('/auth', authRoutes);
router.use('/books', bookRoutes);

module.exports = router;
