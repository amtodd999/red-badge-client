import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import Signup from './auth/SignupForm';
// import Login from './auth/LoginForm';
import Auth from './auth/Auth';

import Movie from './movies/Movie';

import { Header } from './common';

type AppState = {
  token: string
}


class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      token: '',
    }
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.setState({
        token: localStorage.getItem('token')!,
      })
    }
    console.log(this.state.token)
  }

  updateToken = (newToken: string): void => {
    localStorage.setItem('token', newToken)
    this.setState({ token: newToken })
    console.log(this.state.token + " updated token")
  }

  clearToken = () => {
    localStorage.clear()
    this.setState({ token: '' })
  }

  protectedViews = () => {
    return this.state.token === localStorage.getItem('token') ?
      (<div>put movie stuff here</div>) :
      (<div>put account page here</div>)

  }


  render() {
    return (
      <div className="auth-wrapper">
        <Header brand="Izutu" />
        <div className="auth-inner">
        <Auth />
          {/* <Signup updateToken={this.updateToken} />
          <Login updateToken={this.updateToken} /> */}
        </div>
      </div>
    )
  }
}

export default App;
