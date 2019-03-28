import React from 'react'

function Buttons(props) {
  if ( props.isLoggedIn === false) {
    return (
      <div>
        <a href="/auth/git">Login with Github</a>
        <a href="/auth/google">Login with Google</a>
      </div>
    )
  } return ("")              
}

export default Buttons