import React, { useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAccount, getCurrentProfile } from '../../actions/profile'
import Spinner from '../layout/Spinner'
import { loadUser } from '../../actions/auth'
import { Link } from 'react-router-dom'
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'
import { deleteProfile } from '../../actions/profile'

const Dashboard = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
  const profile = useSelector(state => state.profile.profile)
  const loading = useSelector(state => state.profile.loading)

  useEffect(() => {
    dispatch(loadUser())
    dispatch(getCurrentProfile())
  }, [dispatch])

  return (
    <div className="container">
      {
        loading && profile === null ? (
          <Spinner />
        ) : (
          <Fragment>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
              <i className="fa fa-user" /> Welcome {user && user.name}
            </p>
            {
              profile !== null ? (
                <div>
                  <DashboardActions />
                  <Experience experience={profile.experience} />
                  <Education education={profile.education} />
                  <div className="my-2">
                    <button onClick={() => dispatch(deleteProfile())} className="btn btn-danger my-3">
                      Delete Profile
                    </button>
                    <button onClick={() => dispatch(deleteAccount())} className="btn btn-danger my-3">
                      <i className="fa fa-user"></i> Delete Account
                    </button>
                  </div>

                </div>

              ) : (
                <Fragment>
                  <p>Your profile is so boring! Let make it bright</p>
                  <Link to='/create-profile' className='btn btn-primary my-1'>
                    Create Profile
                  </Link>
                </Fragment>
              )
            }
          </Fragment>
        )
      }
    </div>

  )

}

export default Dashboard