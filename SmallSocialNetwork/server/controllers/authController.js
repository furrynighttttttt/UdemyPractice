const asyncHandler = require('express-async-handler')
const { generateToken } = require('../controllers/userController')
const { validationResult } = require('express-validator')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getAuth = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

const loginAuth = asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
    }
})

module.exports = {
    getAuth, loginAuth
}