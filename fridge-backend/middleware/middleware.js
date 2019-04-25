const jwtSecret = require('../config/keys').jwtSecret;
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token =  req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token;

    if (!token) {
        res.status(401).send('No token provided, auth denied!');
    } else {
        try {
            // verify token
            const decoded = jwt.verify(token, jwtSecret);
            
            // add user
            req.email = decoded.email;
            next(); 
        } catch (error) {
            res.status(400).send('Invalid token');
        }
    }
}

module.exports = auth;