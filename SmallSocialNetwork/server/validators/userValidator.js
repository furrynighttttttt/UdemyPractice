const { check } = require('express-validator')
const userValidator = [
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('email', 'Please enter your email')
        .isEmail(),
    check('password', 'Please enter a password with 6 or more characters')
        .isLength({ min: 6 })
]

module.exports = {
    userValidator,
}