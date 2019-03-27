import React from 'react'
import Buttons from './Components/Buttons'
import Profile from './Components/Profile'
import { BrowserRouter as Router} from "react-router-dom"

class App extends React.Component {  

  constructor() {
      super()
      this.state = {
        user: {},
        isLoggedIn: false
      }
  }

  componentDidMount() {
    fetch("https://polar-springs-69108.herokuapp.com/get-user")
    //fetch("http://localhost:8080/get-user")
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

  render() {  
    return (
      <Router>
        <div className="App">
          <Profile user={this.state.user} isLoggedIn={this.state.isLoggedIn} />
          <Buttons isLoggedIn={this.state.isLoggedIn} />
        </div>
      </Router>
    )
  }
}

export default App;
