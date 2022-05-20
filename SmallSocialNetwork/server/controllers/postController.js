const asyncHandler = require('express-async-handler')
const { validationResult } = require('express-validator')
const User = require('../models/userModel')
const Profile = require('../models/profileModel')
const Post = require('../models/postModel')

const getAllPost = asyncHandler(async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 })
        res.json(posts)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

const getPost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(400).json({ msg: 'Post not found' })
        }
        res.json(post)
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Post not found' })

        }
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

const createPost = asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const user = await User.findById(req.user.id).select('-password')

        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })

        const post = await newPost.save()
        res.json(post)

    } catch (err) {
        console.error(err.message)
        res.json(500).send('Server Error')
    }

})

const deletePost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User is not authorized' })
        }

        await post.remove()

        res.json({ msg: 'Post removed' })
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Post not found' })
        }
        console.error(err.message)
        res.json(500).send('Server Error')
    }
})

const likePost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Post already liked' })
        }

        post.likes.unshift({ user: req.user.id })

        await post.save()

        res.json(post.likes)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')

    }
})

const unlikePost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: 'Post yet liked' })
        }

        const removedIndex = post.likes.map(like => like.user.toString().indexOf(req.user.id))

        post.likes.splice(removedIndex, 1)

        await post.save()
        res.json({ msg: 'Unlike Post' })
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server Error' })
    }
})

const createCommentPost = asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const user = await User.findById(req.user.id).select('-password')
        const post = await Post.findById(req.params.id)

        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        }

        post.comments.unshift(newComment)

        await post.save()

        res.json(post.comments)

    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server Error' })
    }
})

const deleteCommentPost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Pull out comment
        const comment = post.comments.find(
            (comment) => comment.id === req.params.comment_id
        );
        // Make sure comment exists
        if (!comment) {
            return res.status(404).json({ msg: 'Comment does not exist' });
        }
        // Check user
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        post.comments = post.comments.filter(
            ({ id }) => id !== req.params.comment_id
        );

        await post.save();

        return res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
})

module.exports = {
    getAllPost,
    getPost,
    createPost,
    likePost,
    unlikePost,
    createCommentPost,
    deleteCommentPost,
    deletePost,
}