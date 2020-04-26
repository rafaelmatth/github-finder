import React from 'react'

const Stars = ({ stars }) => {
    return(
    <div>
    <div className="stars">
        <a href={stars.html_url}>{stars.full_name}</a>
    </div>
    </div>
    )
}


export default Stars