const { check } = require('express-validator')
const profileValidator = [
    check('status', 'Status is required')
        .not()
        .isEmpty(),
    check('skills', 'Skills are required')
        .not()
        .isEmpty()
]

const profileExpValidator = [
    check('title', 'title is required')
        .not()
        .isEmpty(),
    check('company', 'company is required')
        .not()
        .isEmpty(),
    check('from', 'from date is required')
        .not()
        .isEmpty(),
]

const profileEduValidator = [
    check('school', 'school is required')
        .not()
        .isEmpty(),
    check('degree', 'degree is required')
        .not()
        .isEmpty(),
    check('fieldofstudy', 'fieldofstudy is required')
        .not()
        .isEmpty(),
    check('from', 'from date is required')
        .not()
        .isEmpty(),
]

module.exports = {
    profileValidator,
    profileExpValidator,
    profileEduValidator,
}