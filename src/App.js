import React from 'react'
import Profile from './Components/Profile'
import { BrowserRouter as Router} from "react-router-dom"

class App extends React.Component {  

  constructor() {
      super()
      this.state = {
        user: {},
        isLoggedIn: false
      }
      this.renderButtons = this.renderButtons.bind(this)
      this.getUserJSON = this.getUserJSON.bind(this)
  }

  getUserJSON() {
    //fetch("https://polar-springs-69108.herokuapp.com/get-user")
    fetch("http://localhost:8080/get-user")
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('There was a problem fetching get-user')
        }
      })
      .then(responseJSON => {
        this.setState({
          user: responseJSON,
          isLoggedIn: true
        })
      }).catch( (error) => {
        console.log(error)
      })
  }

  componentDidMount() {
    let isLoggedIn = this.getURLParams()
    console.log(isLoggedIn)

    if ( isLoggedIn === '1') {
      this.getUserJSON()
    }
  }

  getURLParams() {
    let href = window.location.href
    let url = new URL(href);
    let params = url.searchParams.get("loggedin");
    
    return params
  }

  renderButtons() {
    if (this.state.isLoggedIn === false) {
      return (
        <div>
          <a href="/auth/git">Login with Github</a>
          <a href="/auth/google">Login with Google</a>
        </div>
      )
    }
  }

  render() {  
    return (
      <Router>
        <div className="App">
          <Profile user={this.state.user} isLoggedIn={this.state.isLoggedIn} />
          {this.renderButtons()}
        </div>
      </Router>
    )
  }
}

export default App;
