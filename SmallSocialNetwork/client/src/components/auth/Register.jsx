import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAlert } from '../../actions/alert'
import { registerUser } from '../../actions/auth'

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = formData

    const dispatch = useDispatch()
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    const onChangeAttribute = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmitForm = e => {
        e.preventDefault()
        if (password !== password2) {
            dispatch(setAlert('Passwords do not match', 'danger', 3000))
        } else {
            dispatch(registerUser({ name, email, password }))
        }
    }

    if (isAuthenticated) {
        return <Navigate replace to='/dashboard' />
    }

    return (
        <section className="container">
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead">
                <i className="fa fa-user" /> Create Your Account
            </p>
            <form className="form" onSubmit={onSubmitForm}>
                <div className="form-group">
                    <input
                        type="text"
                        name="name"
                        placeholder='Name'
                        value={name}
                        onChange={onChangeAttribute}

                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        name="email"
                        placeholder='Email Address'
                        value={email}
                        onChange={onChangeAttribute}

                    />
                    <small className="form-text">
                        This site uses Gravatar so if you want a profile image, use a Gravatar email
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        name="password"
                        placeholder='Password'
                        value={password}
                        onChange={onChangeAttribute}
                        minLength="6"

                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        name="password2"
                        placeholder='Confirm Password'
                        value={password2}
                        onChange={onChangeAttribute}
                        minLength="6"
                    />
                </div>
                <input
                    type="submit"
                    className='btn btn-primary'
                    value='Register'
                />
            </form>
            <p className="my-1">
                Already have an account? <Link to='/login'>Sign In</Link>
            </p>
        </section>
    )
}

export default Register