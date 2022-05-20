import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../actions/auth'

const Login = () => {
    const dispatch = useDispatch()
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData

    const onChangeAttribute = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value })


    const onSubmitForm = e => {
        e.preventDefault()
        dispatch(loginUser(email, password))
    }

    if(isAuthenticated) {
        return <Navigate replace to='/dashboard' />
    }

    return (
        <section className="container">
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead">
                <i className="fa fa-user" />Sign Into Your Account
            </p>
            <form className="form" onSubmit={onSubmitForm}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder='Email Address'
                        name='email'
                        value = {email}
                        onChange={onChangeAttribute}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={onChangeAttribute}

                    />
                </div>
                <input
                    type="submit"
                    className='btn btn-primary'
                    value='Login'
                />
            </form>
            <p className="my-1">
                Don't have an account? <Link to='/register'>Sign Up</Link>
            </p>
        </section>
    )
}

export default Login