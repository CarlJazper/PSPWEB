const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.isAuthenticatedUser = async (req, res, next) => {
    let token;

    // Check for token in the Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } 
    // Fallback to token in cookies
    else if (req.cookies.token) {
        token = req.cookies.token;
    }

    // If no token is found, return an error
    if (!token) {
        return res.status(401).json({ message: 'Login first to access this resource' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the user to the request object
        req.user = await User.findById(decoded.id);

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: `Role (${req.user.role}) is not allowed to access this resource` 
            });
        }
        next();
    };
};
