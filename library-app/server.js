require('dotenv').config();
const express = require('express');
const app = express();
const librarianRoutes = require('./routes/librarianRoutes');
const bookRoutes = require('./routes/bookRoutes');

app.use(express.json()); 
app.use(express.static('public'));
app.use('/librarians', librarianRoutes);
app.use('/books', bookRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
