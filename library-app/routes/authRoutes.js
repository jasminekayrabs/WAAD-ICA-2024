const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');

function makeToken(user) {
    return jwt.sign(user, process.env.SECRET, { expiresIn: '12h' });
}

// Register a new librarian
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password){
        return res.status(400).send("Both username and password are required.");
    }
    try{
        //check if user exists
        const userExists = await pool.query("SELECT * FROM librarians WHERE username = $1", [username]);
        if (userExists.rows.length > 0){
            return res.status(400).send('Username is taken, try another one :)');
        }

        // hash password and save user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await pool.query("INSERT INTO librarians (username, password) VALUES ($1, $2) RETURNING *", [username, hashedPassword]);
        res.status(201).json({ message: 'You have been registered to the library app' });
    } catch (err){
        res.status(500).json({ error: err.message});
    }
});
    
// Librarian login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try{
        //Fetch the user from the db
        const user = await pool.query("SELECT * FROM librarians WHERE username = $1", [username]);
        if (user.rows.length === 0) {
            return res.status(400).send('User not found.');
        }

        //check password
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword){
            return res.status(401).send('Invalid username or password');
        }

        //Generate JWT
        const token = makeToken({ id: user.rows[0].id, username: user.rows[0].username });
        res.json({ message: `Hello ${user.rows[0].username}`, token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
