import React from 'react'


const ProfileAbout = ({ profile: { bio, skills, user: { name } } }) => {
    return (
        <div className="profile-about bg-light p-2">
            {bio && (
                <div>
                    <h2 className="text-primary">{name.trim().split(' ')[0]}'s Bio</h2>
                    <p>{bio}</p>
                </div>
            )}

            <div className="line"></div>
            <h2 className="text-primary">Skill Set</h2>
            <div className="skills">
                {skills.map((skill, key) => (
                    <div key={key} className="p-1">
                        <i className="fa fa-check" />{skill}
                    </div>
                ))}
            </div>
        </div>)
}

export default ProfileAbout