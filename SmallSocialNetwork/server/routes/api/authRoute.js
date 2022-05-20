const express = require('express');
const router = express.Router();
const { auth } = require('../../middlewares/authMiddleware')
const { getAuth, loginAuth } = require('../../controllers/authController')
const { authValidator } = require('../../validators/authValidator')

router.get('/', auth, getAuth)
router.post('/login', authValidator, loginAuth)


module.exports = router