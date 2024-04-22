const router = require('express').Router();
const pool = require('../db');

// Route for getting all books
router.get('/', async (req, res) => {
    try {
        const allBooks = await pool.query('SELECT * FROM books');
        res.json(allBooks.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route for getting a single book by id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
        if (book.rows.length === 0) {
            return res.status(404).send('Book not found');
        }
        res.json(book.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
