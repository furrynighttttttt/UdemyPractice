const express = require('express');
const router = express.Router();
const { registerUser, deleteUser } = require('../../controllers/userController');
const { auth } = require('../../middlewares/authMiddleware');
const { userValidator } = require('../../validators/userValidator');

router.post('/', userValidator, registerUser)
router.delete('/', auth, deleteUser)

module.exports = router