import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { addLike, unLike, deletePost } from '../../actions/post'

const PostItem = ({ showAction = true, post: {
    _id,
    text,
    name,
    avatar,
    user,
    likes,
    comments,
    date,
} }) => {

    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)

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
                {showAction &&
                    <div>
                        <button onClick={() => dispatch(addLike(_id))} type="button" className="btn btn-light">
                            <i className="fa fa-thumbs-up"></i>
                            <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
                        </button>
                        <button onClick={() => dispatch(unLike(_id))} type="button" className="btn btn-light">
                            <i className="fa fa-thumbs-down"></i>
                        </button>
                        <Link to={`/post/${_id}`} className="btn btn-primary">
                            Discussion {' '}
                            {comments.length > 0 && (
                                <span className='comment-count'>{comments.length}</span>
                            )}
                        </Link>
                        {!auth.loading && user === auth.user._id && (
                            <button onClick={() => dispatch(deletePost(_id))} type="button" className="btn btn-danger">
                                <i className="fa fa-times" />
                            </button>
                        )}
                    </div>}
            </div>
        </div>
    )
}

export default PostItem