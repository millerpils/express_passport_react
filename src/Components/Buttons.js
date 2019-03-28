import React from 'react'

function Buttons(props) {
  if ( props.isLoggedIn === false) {
    return (
      <div>
        <a href="/auth/git" onClick={this.handleClick}>Login with Github</a>
        <a href="/auth/google" onClick={this.handleClick}>Login with Google</a>
      </div>
    )
  } return ("")              
}

export default Buttons