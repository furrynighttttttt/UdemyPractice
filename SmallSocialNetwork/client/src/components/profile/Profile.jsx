import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileByID } from '../../actions/profile'
import { Link, useParams } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'

const Profile = () => {
    const dispatch = useDispatch()
    const profile = useSelector(state => state.profile.profile)
    const loading = useSelector(state => state.profile.loading)
    const auth = useSelector(state => state.auth)
    const { id } = useParams()

    useEffect(() => {
        dispatch(getProfileByID(id))
    }, [dispatch, id])

    return (
        <div className='container'>
            {
                profile === null || loading ?
                    <Spinner /> :
                    <div>
                        <Link to='/profiles' className='btn btn-light'>
                            Back To Developers
                        </Link>
                        {
                            auth.isAuthenticated &&
                            auth.loading === false &&
                            profile.user._id === auth.user._id &&
                            <Link to='/edit-profile' className='btn btn-dark'>
                                Edit Profile
                            </Link>
                        }
                        <div className="profile-grid my-1">
                            <ProfileTop profile={profile} />
                            <ProfileAbout profile={profile} />
                            <div className="profile-exp bg-white p-2">
                                <h2 className="text-primary">Experience</h2>
                                {profile.experience.length > 0 ? (
                                    <div>
                                        {profile.experience.map((experience => (
                                            <ProfileExperience
                                                key={experience._id}
                                                experience={experience}
                                            />
                                        )))}
                                    </div>
                                ) : (<h4>No Experience Credentials</h4>)
                                }
                            </div>
                            <div className="profile-edu bg-white p-2">
                                <h2 className="text-primary">Education</h2>
                                {profile.education.length > 0 ? (
                                    <div>
                                        {profile.education.map((education => (
                                            <ProfileEducation
                                                key={education._id}
                                                education={education}
                                            />
                                        )))}
                                    </div>
                                ) : (<h4>No Education Credentials</h4>)
                                }
                            </div>
                        </div>
                    </div>
            }
        </div >
    )
}

export default Profile