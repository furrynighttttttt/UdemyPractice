import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createProfile, updateProfile, getCurrentProfile } from '../../actions/profile'

const initFormData = {
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    instagram: ''
}

const CreateProfile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const profile = useSelector(state => state.profile.profile)
    const loading = useSelector(state => state.profile.loading)
    const creatingProfile = useMatch('/create-profile')

    const [formData, setFormData] = useState(initFormData)

    const {
        company,
        website,
        location,
        status,
        skills,
        bio,
        twitter,
        facebook,
        linkedin,
        instagram
    } = formData

    const [displaySocial, toggleDisplaySocial] = useState(false)

    const onCreate = (e) => {
        e.preventDefault()
        dispatch(createProfile(formData, navigate))

        // dispatch(createProfile(formData, navigate, profile ? true : false))
    }

    const onUpdate = (e) => {
        e.preventDefault()
        dispatch(updateProfile(formData, navigate))

    }

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onOpenSocialInput = () => {
        toggleDisplaySocial(!displaySocial)
    }

    useEffect(() => {
        if (!profile) {
            dispatch(getCurrentProfile())
        }

        if (!loading && profile) {
            const profileData = { ...initFormData }
            for (const key in profile) {
                if (key in profileData) {
                    profileData[key] = profile[key]
                }
            }
            for (const key in profile.social) {
                if (key in profileData) {
                    profileData[key] = profile.social[key]
                }
            }
            if (Array.isArray(profileData.skills)) {
                profileData.skills = profileData.skills.join(', ')
            }
            setFormData(profileData)
        }
    }, [loading, dispatch, profile])

    return (
        <section className='container'>
            <h1 className="large text-primary">
                {
                    creatingProfile ? 'Create Your Profile' : 'Edit Your Profile'
                }
            </h1>
            <p className="lead">
                <i className="fa fa-user" />
                {
                    creatingProfile ? 'Let get some information to make you look cool!' : 'Update some changes'
                }
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={!profile ? onCreate : onUpdate}>
                <div className="form-group">
                    <select name="status" value={status} onChange={onChange}>
                        <option>* Select Professional Status</option>
                        <option value="Developer">Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Student or Learning">Student or Learning</option>
                        <option value="Instructor">Instructor or Teacher</option>
                        <option value="Intern">Intern</option>
                        <option value="Other">Other</option>
                    </select>
                    <small className="form-text">
                        Give us an idea of where you are at in your career
                    </small>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Company"
                            name="company"
                            value={company}
                            onChange={onChange}
                        />
                        <small className="form-text">
                            Could be your own company or one you work for
                        </small>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Website"
                            name="website"
                            value={website}
                            onChange={onChange}
                        />
                        <small className="form-text">
                            Could be your own or a company website
                        </small>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Location"
                            name="location"
                            value={location}
                            onChange={onChange}
                        />
                        <small className="form-text">
                            City & state suggested (eg. Boston, MA)
                        </small>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="* Skills"
                            name="skills"
                            value={skills}
                            onChange={onChange}
                        />
                        <small className="form-text">
                            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
                        </small>
                    </div>
                    <div className="form-group">
                        <textarea
                            placeholder="A short bio of yourself"
                            name="bio"
                            value={bio}
                            onChange={onChange}
                        />
                        <small className="form-text">Tell us a little about yourself</small>
                    </div>
                    <div className="my-2">
                        <button
                            onClick={onOpenSocialInput}
                            type="button"
                            className="btn btn-light"
                        >
                            Add Social Network Links
                        </button>
                        <span>Optional</span>
                    </div>

                    {
                        displaySocial &&
                        <div>
                            <div className="form-group social-input">
                                <i className="fa fa-twitter fa-2x"></i>
                                <input
                                    type="text"
                                    name="twitter"
                                    value={twitter}
                                    onChange={onChange}
                                    placeholder="Twitter URL"
                                />
                            </div>

                            <div className="form-group social-input">
                                <i className="fa fa-facebook fa-2x"></i>
                                <input
                                    type="text"
                                    name="facebook"
                                    value={facebook}
                                    onChange={onChange}
                                    placeholder="Facebook URL"
                                />
                            </div>

                            <div className="form-group social-input">
                                <i className="fa fa-linkedin fa-2x"></i>
                                <input
                                    type="text"
                                    name="linkedin"
                                    value={linkedin}
                                    onChange={onChange}
                                    placeholder="Linkedin URL"
                                />
                            </div>

                            <div className="form-group social-input">
                                <i className="fa fa-instagram fa-2x"></i>
                                <input
                                    type="text"
                                    name="instagram"
                                    value={instagram}
                                    onChange={onChange}
                                    placeholder="Instagram URL"
                                />
                            </div>
                        </div>
                    }
                    <input type="submit" className="btn btn-primary my-1" />
                    <Link className="btn btn-light my-1" to='/dashboard'>
                        Go Back
                    </Link>
                </div>
            </form>
        </section>
    )
}

export default CreateProfile