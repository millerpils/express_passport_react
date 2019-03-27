import React from 'react'
import ProfileContent from './ProfileContent';

function Profile(props) {
  if ( props.isLoggedIn === false) {
    return (
      <div>
        <h1>Welcome, guest</h1>
      </div>
    )
  } else if ( props.user.provider === "github") {
    return (
      <div>
        <h1>Welcome, {props.user.displayName}</h1>
        <ProfileContent user={props.user} isLoggedIn={props.isLoggedIn} />
      </div>
    )
  } else if (props.user.provider === "google") {
    return (
      <div>
        <h1>Welcome, {props.user.name.givenName}</h1>
        <ProfileContent user={props.user} isLoggedIn={props.isLoggedIn} />
      </div>
    ) 
  } else {
    return (
      <div>
        <h1>Unknown provider!</h1>
      </div>
    )
  }           
}

export default Profile