const express = require('express');
const router = express.Router();
const { createPost, getAllPost, getPost, deletePost, likePost, unlikePost, createCommentPost, deleteCommentPost } = require('../../controllers/postController')
const { auth } = require('../../middlewares/authMiddleware');
const { postValidator, postCommentValidator } = require('../../validators/postValidator');

router.post('/', auth, postValidator, createPost)
router.post('/comment/:id', auth, postCommentValidator, createCommentPost)

router.get('/', auth, getAllPost)
router.get('/:id', auth, getPost)
router.put('/like/:id', auth, likePost)
router.put('/unlike/:id', auth, unlikePost)
router.delete('/:id', auth, deletePost)

router.delete('/comment/:id/:comment_id', auth, deleteCommentPost)
module.exports = router