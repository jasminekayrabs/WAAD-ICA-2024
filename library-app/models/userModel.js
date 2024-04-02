const db = require('../db'); 
const bcrypt = require('bcryptjs');

const User = {
    
    async create(username, password) {
        // First, check if the username already exists
        const userExistsQuery = 'SELECT * FROM users WHERE username = $1';
        const userExistsResult = await db.query(userExistsQuery, [username]);
        
        if (userExistsResult.rows.length > 0) {
            // If a user with this username already exists, throw an error
            throw new Error('Username already exists');
        }

        // If user does not exist, hash the password before saving to the database
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password, salt);
        
        const createUserQuery = 'INSERT INTO users(username, password_hash) VALUES($1, $2) RETURNING *';
        const { rows } = await db.query(createUserQuery, [username, passwordHash]);
        return rows[0]; // Return the newly created user
    },

    // Find a user by username (for login)
    async findByUsername(username) {
        const queryText = 'SELECT * FROM users WHERE username = $1';
        try {
            const { rows } = await db.query(queryText, [username]);
            if (rows.length > 0) {
                return rows[0]; // User found, return the user
            }
            return null; // No user found with that username
        } catch (error) {
            throw error;
        }
    },
    validatePassword(inputPassword, storedPasswordHash) {
        return bcrypt.compareSync(inputPassword, storedPasswordHash);
    }
};


module.exports = User;
