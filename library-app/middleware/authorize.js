const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;  // Directly use the token without splitting

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
    } catch (ex) {
        console.error('Token verification failed:', ex.message);
        res.status(400).json({ error: 'Invalid token.' });
    }
};