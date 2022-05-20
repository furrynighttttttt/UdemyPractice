const express = require('express');
const router = express.Router();
const { getProfile, getUserProfile, getAllProfile, createProfile, updateProfile, addExpProfile, deleteProfile, deleteExpProfile, addEduProfile, deleteEduProfile } = require('../../controllers/profileController')
const { auth } = require('../../middlewares/authMiddleware')
const { profileValidator, profileExpValidator, profileEduValidator } = require('../../validators/profileValidator')

router.get('/myProfile', auth, getProfile)
router.get('/user/:user_id', getUserProfile)
router.get('/', getAllProfile)

router.post('/', auth, profileValidator, createProfile)

router.put('/update', auth, profileValidator, updateProfile)
router.put('/experience', auth, profileExpValidator, addExpProfile)
router.put('/education', auth, profileEduValidator, addEduProfile)

router.delete('/', auth, deleteProfile)
router.delete('/experience/:exp_id', auth, deleteExpProfile)
router.delete('/education/:edu_id', auth, deleteEduProfile)

module.exports = router