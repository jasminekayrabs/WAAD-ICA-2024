const express = require('express');
const router = require('express').Router();
const pool = require('../db');
const authorize = require('../middleware/authorize');

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



//Protected route for adding books
router.post('/', authorize, async (req, res) =>{
    const { title, author, genre } = req.body;
    
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
            "INSERT INTO books (title, author, genre) VALUES ($1, $2, $3) RETURNING *",
            [title, author, genre]
        );
        res.status(201).json(newBook.rows[0]);
        // res.status(201).send(`You have successfully added ${title} by ${author}`);
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).json({ error: error.message });
    }
});

//Protected route for updating book details
router.patch('/:id', authorize, async (req, res) => {
    const { id } = req.params;
    const { title, author, genre } = req.body;
    const updates = {};

    if (title) updates.title = title;
    if (author) updates.author = author;
    if (genre) updates.genre = genre;

    const setClause = Object.keys(updates)
        .map((key, index) => `${key} = $${index + 2}`)
        .join(', ');

    if (!setClause) return res.status(400).send('No valid fields provided for update.');

    try {
        const updatedBook = await pool.query(
            `UPDATE books SET ${setClause} WHERE id = $1 RETURNING *`,
            [id, ...Object.values(updates)]
        );

        if (updatedBook.rows.length === 0) {
            return res.status(404).send('Book not found.');
        }

        res.json(updatedBook.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
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