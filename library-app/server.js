require('dotenv').config();
const express = require('express');
const app = express();

const apiRoutes = require('./routes/api');

app.use(express.json()); 
app.use(express.static('public'));
app.use('/api', apiRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
