require('dotenv').config();
const express = require('express');
const app = express();
const librarianRoutes = require('./librarianRoutes');

app.use(express.json()); 
app.use('/librarians', librarianRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
