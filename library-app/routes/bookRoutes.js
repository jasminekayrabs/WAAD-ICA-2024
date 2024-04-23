const express = require('express');
const router = require('express').Router();
const pool = require('../db');

// // Getting books with optional filters eg Title, Author, etc.

// router.get('/', async (req, res) => {
//     let { title, author, genre } = req.query;
//     let baseQuery = `SELECT * FROM books WHERE `;
//     let conditions = [];
//     let params = [];

//     if (title) {
//         conditions.push(`title ILIKE $${conditions.length + 1}`);
//         params.push(`%${title}%`);
//     }
//     if (author) {
//         conditions.push(`author ILIKE $${conditions.length + 1}`);
//         params.push(`%${author}%`);
//     }
//     if (genre) {
//         conditions.push(`genre ILIKE $${conditions.length + 1}`);
//         params.push(`%${genre}%`);
//     }

//     if (conditions.length > 0) {
//         baseQuery += conditions.join(' AND ');
//     } else {
//         baseQuery = "SELECT * FROM books";  // If there are no filters provided, return all books
//     }

//     try {
//         const result = await pool.query(baseQuery, params);
//         res.json(result.rows);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     } 
// })

router.get('/', async (req, res) => {
    const { query } = req.query;
    let baseQuery = "SELECT * FROM books";
    let params = [];

    if (query) {
        baseQuery += " WHERE title ILIKE $1 OR author ILIKE $1 OR genre ILIKE $1";
        params.push(`%${query}%`);
    }

    try {
        const result = await pool.query(baseQuery, params);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})
module.exports = router;
