// ratelimiter.js
let numberOfRequestsForUser = {};
import jwt from 'jsonwebtoken';

// Middleware to rate limit requests
const rateLimiter = (req, res, next) => {
    const userId = req.headers.authorization ? jwt.decode(req.headers.authorization.split(' ')[1]).id : null;
    if (!userId) {
        return next();
    }

    numberOfRequestsForUser[userId] = (numberOfRequestsForUser[userId] || 0) + 1;

    if (numberOfRequestsForUser[userId] > 5) {
        return res.status(404).send('Too many requests');
    }

    next();
};

setInterval(() => {
    numberOfRequestsForUser = {};
}, 1000);

export default rateLimiter;
