import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Auth from './auth/Auth';
import Menu from './common/Menu';
import ReviewIndex from './reviews/ReviewIndex';
import MovieIndex from './movies/MovieIndex';


type AppState = {
  sessionToken: string
}


class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      sessionToken: ''
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
        (<div>
          {/* <Menu 
          sessionToken={this.state.sessionToken} 
          clearToken={this.clearToken}
          /> */}
          <Router>
          <MovieIndex sessionToken={this.state.sessionToken}/>  
          </Router></div>)
        :
        (<Auth updateToken={this.updateToken} />)

    )

  }


  render() {
    return (
      <div>
        {this.state.sessionToken && (
          <Menu 
          sessionToken={this.state.sessionToken}
          clearToken={this.clearToken}
          />
        )}
      <div className="auth-wrapper">
        <Switch>
          <Route exact path= '/'>
          {this.protectedViews()}
          </Route>
        <Route exact path= '/movies'>
          <MovieIndex sessionToken={this.state.sessionToken}/>
        </Route>
        <Route exact path= '/reviews'>
          <ReviewIndex sessionToken={this.state.sessionToken}/>
        </Route>
        </Switch>
      </div>
      </div>
    )
  }
}

export default App;
