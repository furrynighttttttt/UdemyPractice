import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { deleteComment } from '../../actions/post'

const CommentItem = (postId, { comment: {
    _id,
    text,
    name,
    avatar,
    user,
    date
} }) => {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    
    const onDelete = e => {
        dispatch(deleteComment(postId, _id))
    }

    return (
        <div className="post bg-white p-1 my-1">
            <div>
                <Link to={`/profile/${user}`}>
                    <img
                        className="round-img"
                        src={avatar}
                        alt=""
                    />
                    <h4>{name}</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">
                    {text}
                </p>
                <p className="post-date">
                    Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
                </p>
                {!auth.loading && user === auth.user._id && (
                    <button onClick={onDelete} className="btn btn-danger">
                        <i className="fa fa-times" />
                    </button>
                )}
            </div>
        </div>)
}

export default CommentItem