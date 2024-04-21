require('dotenv').config();
const express = require('express');
const app = express();
const

app.use(express.json()); // For parsing application/json

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
