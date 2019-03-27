import React from 'react'

function ProfileContent(props) {
  return (
    <div class="grid-container">
      <div class="column">
        <div className="profile-photo">
          <img src={props.user.photos[0].value} alt="" />
        </div>
      </div>
      <div class="column">
        <p>Your login provider is: {props.user.provider}</p>
        <p>
          <a href="/logout">Logout</a>
        </p>
      </div>
    </div>
  )   
}

export default ProfileContent