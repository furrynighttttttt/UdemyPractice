import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../layout/Spinner'
import PostItem from './PostItem'
import { getAllPosts } from '../../actions/post'
import PostForm from './PostForm'


const Posts = () => {
    const dispatch = useDispatch()
    const posts = useSelector(state => state.post.posts)
    const loading = useSelector(state => state.post.loading)

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    return (
        loading ? (
            <Spinner />
        ) : (
            <section className="container">
                <h1 className="large text-primary">Posts</h1>
                <p className="lead">
                    <i className="fa fa-user" /> Welcome to the community
                </p>
                <PostForm />
                <div className="posts">
                    {posts.map(post => (
                        <PostItem key={post._id} post={post}/>
                    ))}
                </div>
            </section>
        )

    )
}

export default Posts