const { validationResult } = require("express-validator")
const asyncHandler = require('express-async-handler')
const gravatar = require('gravatar')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const Profile = require('../models/profileModel')



const registerUser = asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const { name, email, password } = req.body;

        const userExist = await User.findOne({ email })
        if (userExist) {
            res.status(400).json({ errors: [{ msg: 'User already exists' }] })
        }

        //Get user gravatar
        const avatar = gravatar.url(email, {
            s: "200",
            r: "pg",
            d: "mm"
        })

        //harsh password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            name,
            email,
            avatar,
            password: hashedPassword
        })

        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        } else {
            res.status(400).json({ errors: [{ msg: 'Invalid user data' }] });
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server Error')
    }

})

const deleteUser = asyncHandler(async (req, res) => {
    try {
        await User.findOneAndRemove({ _id: req.user.id })
        await Profile.findOneAndRemove({ user: req.user.id })
        res.status(200).json({ errors: [{ msg: 'Delete user' }] });
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

module.exports = {
    registerUser,
    deleteUser,
    generateToken,
}