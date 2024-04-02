const express = require('express');
const User = require('../models/userModel'); 
const router = express.Router();
const jwt = require('jsonwebtoken');

//Register route
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const newUser = await User.create(username, password);
        res.status(201).json({
            message: "User successfully registered",
            user: { id: newUser.id, username: newUser.username }
        });
    } catch (error) {
        if (error.message.includes('Username already exists')) {
            return res.status(400).json({ error: error.message });
        }
        console.error('Registration Error:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
});

//Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const user = await User.findByUsername(username);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        
        if (User.validatePassword(password, user.password_hash)) {
            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );
            
            res.json({ message: "Login successful", token });
        } else {
            return res.status(401).json({ error: "Username or password is wrong" });
        }
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ error: 'Failed to log in' });
    }
});

module.exports = router;