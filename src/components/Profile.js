import React from 'react'

const Profile = ({user}) => {
    return(
    <div className="profile">
        <img className="img-profile" src={user.avatar_url} />
        <div className="data-user">
            <p>{user.name}</p>
            <p>{user.bio}</p>
            <p>{user.location}</p>
        </div>
    </div>)
}

export default Profile;