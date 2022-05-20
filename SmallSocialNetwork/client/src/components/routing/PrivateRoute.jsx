// import React from 'react'
// import { Navigate, Outlet } from 'react-router-dom'

// const PrivateRoute = ({ isAllowed, children }) => {
//     // const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
//     // const loading = useSelector(state => state.auth.loading)

//     // return (
//     //     <Route {...rest} render={props => !isAuthenticated && !loading ?
//     //         (<Navigate replace to='/login' />) :
//     //         (<Element {...props} />)} />
//     // )

//     if(isAllowed) {
//         return <Navigate replace to='/login' />
//     } else {
//         return children ? children : <Outlet />
//     }
// }

// export default PrivateRoute

import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Spinner from '../layout/Spinner';

const PrivateRoute = ({ element: Element}) => {
    const loading = useSelector(state => state.auth.loading)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    if (loading) return <Spinner />;
    if (isAuthenticated) return <Element />;

    return <Navigate to="/login" />;
};

export default PrivateRoute;