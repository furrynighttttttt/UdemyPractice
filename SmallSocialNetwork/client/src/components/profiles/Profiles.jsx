import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProfiles } from '../../actions/profile'
import Spinner from '../layout/Spinner'
import ProfileItem from './ProfileItem'

const Profiles = () => {
    const dispatch = useDispatch()
    const profiles = useSelector(state => state.profile.profiles)
    const loading = useSelector(state => state.profile.loading)
    const profileList =
        profiles.length > 0 ?
            (profiles.map(
                profile => (
                    <ProfileItem key={profile._id} profile={profile} />
                ))
            ) : <h4>No profiles found...</h4>

    useEffect(() => {
        dispatch(getAllProfiles())
    }, [dispatch])

    return (
        <div className='container'>
            {
                loading ? <Spinner /> :
                    <div>
                        <h1 className="large text-primary">
                            Developers
                        </h1>
                        <p className="lead">
                            <i className="fa fa-connectdevelop">
                                Browse and connect with developers
                            </i>
                        </p>
                        <div className="profiles">
                            {profileList}
                        </div>
                    </div>
            }
        </div>
    )
}

export default Profiles