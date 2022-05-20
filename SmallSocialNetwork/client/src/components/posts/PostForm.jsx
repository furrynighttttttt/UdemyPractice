import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPost } from '../../actions/post'


const PostForm = () => {
    const dispatch = useDispatch()

    const [text, setText] = useState('')

    const onSubmit = e => {
        e.preventDefault()
        dispatch(addPost({ text }))
        setText('')
    }

    return (
        <section className="container">
            <div className="post-form">
                <div className="bg-primary p">
                    <h3>Say Something...</h3>
                </div>
                <form onSubmit={onSubmit} className="form my-1">
                    <textarea
                        name="text"
                        cols="30"
                        rows="5"
                        placeholder="Create a post"
                        value={text}
                        required
                    ></textarea>
                    <input type="submit" className="btn btn-dark my-1" value="Submit" />
                </form>
            </div>
        </section>
    )
}

export default PostForm