import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../actions/auth'

const Navbar = () => {
    const dispatch = useDispatch()
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const loading = useSelector(state => state.auth.loading)

    const onLogout = () => {
        dispatch(logoutUser())
    }

    const authLinks = (
        <ul>
            <li>
                <Link to='/profiles'>
                    Developers
                </Link>
            </li>
            <li>
                <Link to='/dashboard'>
                    <i className="fa fa-user"></i>{' '}
                    <span className='hide-sm'>Dashboard</span>
                </Link>
            </li>
            <li>
                <Link onClick={onLogout} to=''>
                    <i className="fa fa-sign-out-alt"></i>{' '}
                    <span className='hide-sm'>Logout</span>
                </Link>
            </li>
        </ul >
    )

    const guestLinks = (
        <ul>
            <li>
                <Link to='/profiles'>
                    Developers
                </Link>
            </li>
            <li>
                <Link to="/register">
                    Register
                </Link>
            </li>
            <li>
                <Link to="/login">
                    Login
                </Link>
            </li>
        </ul >
    )

    return (
        <nav className='navbar bg-dark'>
            <h1>
                <Link to="/"><i className='fa fa-code'></i>DevConnector</Link>
            </h1>
            {
                !loading && isAuthenticated ? authLinks : guestLinks
            }
        </nav>
    )
}

export default Navbar
