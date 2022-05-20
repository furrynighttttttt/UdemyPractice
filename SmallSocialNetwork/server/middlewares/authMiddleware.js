const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const auth = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //get token from headers
            token = req.headers.authorization.split(' ')[1]

            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //get user from token
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error)
            res.status(401).json({msg: 'No auth'})
        }
    }

    if (!token) {
        res.status(401).json({msg: 'No token, auth denied'})
    }
    // Get token from header
    // const token = req.header('x-auth-token');

    // // Check if not token
    // if (!token) {
    //     return res.status(401).json({ msg: 'No token, authorization denied' });
    // }

    // // Verify token
    // try {
    //     jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    //         if (error) {
    //             return res.status(401).json({ msg: 'Token is not valid' });
    //         } else {
    //             req.user = decoded.user;
    //             next();
    //         }
    //     });
    // } catch (err) {
    //     console.error('something wrong with auth middleware');
    //     res.status(500).json({ msg: 'Server Error' });
    // }
})

module.exports = { auth }