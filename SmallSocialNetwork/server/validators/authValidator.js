const { check } = require('express-validator')
const authValidator = [
    check('email', 'Please enter your email')
        .isEmail(),
    check('password', 'Password is required')
        .exists()
]

module.exports = {
    authValidator,
}