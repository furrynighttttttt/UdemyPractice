import React from 'react'
import { Link } from 'react-router-dom'

const ProfileTop = ({ profile: {
    company,
    status,
    location,
    website,
    social,
    user: { name, avatar }
} }) => {
    return (
        <div className="profile-top bg-primary p-2">
            <img className="round-img my-1" src={avatar} alt="avatar" />
            <h1 className="large">{name}</h1>
            <p className="lead">{status} {company && <span>at {company}</span>}</p>
            <p>{location && <span>at {location}</span>}</p>
            <div className="icons my-1">
                {website && (
                    <Link to={website} target="_blank" rel="noopener noreferrer">
                        <i className="fa fa-globe fa-2x"></i>
                    </Link>
                )}
                {social ?
                    Object.entries(social)
                        .filter(([_, value]) => value)
                        .map(([key, value]) => (
                            <a
                                key={key}
                                href={value}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className={`fa fa-${key} fa-2x`}></i>
                            </a>
                        )) : null
                }
            </div>
        </div>
    )
}

export default ProfileTop