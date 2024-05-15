const express = require('express');
const router = require('express').Router();
const pool = require('../db');
const authorize = require('../middleware/authorize');
const multer = require('multer');
const path = require('path');

// Configure storage for file uploads
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/images'),  // Adjust the path as necessary
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

//getting books
router.get('/', async (req, res) => {
    const { query, category} = req.query;
    // let { query, category } = req.query;
    let sql, params;

    if (query && category) {
        sql = "SELECT * FROM books WHERE (title ILIKE $1 OR author ILIKE $1) AND genre = $2";
        params = [`%${query}%`, category];
    } else if (query) {
       // Filter only by query
       sql = "SELECT * FROM books WHERE title ILIKE $1 OR author ILIKE $1 OR genre ILIKE $1";
       params = [`%${query}%`];
    } else if (category) {
        // Filter only by category
        sql = "SELECT * FROM books WHERE genre = $1";
        params = [category];
    } else {
        // No filters applied, fetch all books
        sql = "SELECT * FROM books";
        params = [];
    }

    try {
        const result = await pool.query(sql, params);
        if (result.rows.length === 0) {
            res.status(200).json([]); // Return an empty array if no books are found
        } else {
            res.json(result.rows);
        }
    } catch (err) {
        console.error("Error querying database:", err.message);
        res.status(500).send(err.message);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image')) {
            cb(null, true);
        } else {
            cb(new Error('Not an image! Please upload only images.'), false);
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 } // 5 MB limit for book cover imagae
});

//Protected route for adding books
router.post('/', authorize, upload.single('cover_image'), async (req, res) =>{
    const { title, author, genre, summary } = req.body;
    const cover_image = req.file ? `/images/${req.file.filename}` : null;
    
    if (!title || !author || !genre) {
        return res.status(400).send("Please provide a title, author, and genre.");
    }

    try {
        // Check if book exists 
        const existingBook = await pool.query(
            "SELECT * FROM books WHERE title = $1 AND author = $2",
            [title, author]
        );
        if (existingBook.rows.length > 0){
            return res.status(409).send("This book has already been added to the catalog. Try adding a new book.");
        }

        // Insert the new book if it doesnt exist
        const newBook = await pool.query(
            "INSERT INTO books (title, author, genre, cover_image, summary) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [title, author, genre, cover_image, summary]
        );
        res.status(201).json(newBook.rows[0]);
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).json({ error: error.message });
    }
});


// PATCH route handling updates
router.patch('/:id', authorize, upload.single('cover_image'), async (req, res) => {
    const { id } = req.params;
    const { title, author, genre, summary } = req.body;
    const updates = [];
    const values = [id];

    if (title) {
        updates.push(`title = $${updates.length + 2}`);
        values.push(title);
    }
    if (author) {
        updates.push(`author = $${updates.length + 2}`);
        values.push(author);
    }
    if (genre) {
        updates.push(`genre = $${updates.length + 2}`);
        values.push(genre);
    }
    if (summary) {
        updates.push(`summary = $${updates.length + 2}`);
        values.push(summary);
    }
    if (req.file) {
        updates.push(`cover_image = $${updates.length + 2}`);
        values.push(`/images/${req.file.filename}`);
    }

    if (!updates.length) return res.status(400).send('No updates provided.');

    const sql = `UPDATE books SET ${updates.join(', ')} WHERE id = $1 RETURNING *`;
    try {
        const result = await pool.query(sql, values);
        if (result.rows.length === 0) return res.status(404).send('Book not found.');
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).send('Failed to update book');
    }
});


//Protected route for deleting
router.delete('/:id', authorize, async (req, res) => {
    const { id } = req.params;
    try {
        // Perform deletion operation; e.g., DELETE FROM books WHERE id = $1
        const result = await pool.query('DELETE FROM books WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(404).send('Book not found.');
        }
        res.send('Book deleted successfully.');
    } catch (err) {
        res.status(500).send('Server error');
    }
});


//Unprotected route for details about each book
router.get('/:id', async (req, res) => {
    const { id } = req.params; // Extracting the book ID from the URL parameter
    try {
        const result = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Book not found' }); // Send a 404 if no book is found
        } else {
            res.json(result.rows[0]); // Send the book data
        }
    } catch (err) {
        console.error("Error querying database:", err.message);
        res.status(500).send(err.message); // Send a server error message if the query fails
    }
});

module.exports = router;