import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import Signup from './auth/SignupForm';
// import Login from './auth/LoginForm';
import Auth from './auth/Auth';

import DisplayMovies from './movies/DisplayMovies';

import { Menu } from './common';
import Landing from './movies/Landing';


type AppState = {
  sessionToken: string
}


class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      sessionToken: '',
    }
  }

  componentDidMount() {
    if (localStorage.getItem('sessionToken')) {
      this.setState({
        sessionToken: localStorage.getItem('sessionToken')!,
      })
    }
    console.log(this.state.sessionToken)
  }

  updateToken = (newToken: string): void => {
    localStorage.setItem('sessionToken', newToken)
    this.setState({ sessionToken: newToken })
    console.log(this.state.sessionToken + " updated token")
  }

  clearToken = () => {
    localStorage.clear()
    this.setState({ sessionToken: '' })
  }

  protectedViews = () => {
    return (
      
      this.state.sessionToken === localStorage.getItem('sessionToken') ?
        (<Landing sessionToken={this.state.sessionToken}
          /> ) :
        (<Auth updateToken={this.updateToken}/>)
        
    )

  }


  render() {
    return (
      <div className="auth-wrapper">
        <Menu />
        <div>
        {/* <Auth updateToken={this.updateToken}/> */}
        {this.protectedViews()}
          {/* <Signup updateToken={this.updateToken} />
          <Login updateToken={this.updateToken} /> */}
        </div>
      </div>
    )
  }
}

export default App;
