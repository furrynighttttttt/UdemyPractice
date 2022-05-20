const { check } = require('express-validator')
const postValidator = [
    check('text', 'text is required')
        .not()
        .isEmpty()
]

const postCommentValidator = [
    check('text', 'text is required')
        .not()
        .isEmpty()
]

module.exports = {
    postValidator,
    postCommentValidator,
}