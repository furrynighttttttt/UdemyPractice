import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addComment } from '../../actions/post'

const CommentForm = () => {
    const dispatch = useDispatch()
    const { id } = useParams()

    const [text, setText] = useState('')

    const onSubmit = e => {
        e.preventDefault()
        dispatch(addComment(id, { text }))
        setText('')
    }

    return (
        <section className="container">
            <div className="post-form">
                <div className="bg-primary p">
                    <h3>Comment Something...</h3>
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
        </section>)
}

export default CommentForm