const router = require('express').Router();
const bcrypt = require('bcrypt');
const pool = require('../db');

// Registration of librarians
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        const newLibrarian = await pool.query(
            'INSERT INTO librarians (username, password) VALUES ($1, $2) RETURNING *',
            [username, hashedPassword]
        );
        res.status(201).json(newLibrarian.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
