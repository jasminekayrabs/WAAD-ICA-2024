const express = require('express');
const dotenv = require('dotenv');
const db = require('./db');

dotenv.config();
const app = express();
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('Library App API');
});

// Test route to query the database
app.get('/test-db', async (req, res) => {
    try {
      const { rows } = await db.query('SELECT NOW()');
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });

const authRoutes = require('./routes/authRoutes'); 
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
