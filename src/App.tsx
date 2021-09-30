import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {GlobalStyle} from './GlobalStyle';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Auth from './auth/Auth';
import Menu from './common/Menu';
import ReviewIndex from './reviews/ReviewIndex';
import MovieIndex from './movies/MovieIndex';
import Admin from './common/Admin';
import Home from './common/Home';


type AppState = {
  sessionToken: string,
  isAdmin: string | null
}


class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      sessionToken: '',
      isAdmin: ''
    }
  }

  componentDidMount() {
    if (localStorage.getItem('sessionToken')) {
      this.setState({
        sessionToken: localStorage.getItem('sessionToken')!,
      })
    }
    if (localStorage.getItem('admin')) {
      this.setState({ isAdmin: localStorage.getItem('admin') })
    }
    console.log(this.state.isAdmin)
  }

  updateToken = (newToken: string): void => {
    localStorage.setItem('sessionToken', newToken)
    this.setState({ sessionToken: newToken })
    console.log(this.state.sessionToken + " updated token")
  }

  updateAdmin = (newAdmin: string): void => {
    localStorage.setItem('admin', newAdmin);
    this.setState({ isAdmin: newAdmin })
  }



  clearToken = () => {
    localStorage.clear()
    this.setState({ sessionToken: '' })
  }

  protectedViews = () => {
    return (

      this.state.sessionToken === localStorage.getItem('sessionToken') ?
        (<div>
          <Router>
            {/* <MovieIndex sessionToken={this.state.sessionToken} /> */}
            <Home sessionToken={this.state.sessionToken} />
          </Router></div>)
        :
        (<Auth updateToken={this.updateToken} updateAdmin={this.updateAdmin} />)

    )

  }

  render() {
    return (
      <GlobalStyle>
        {this.state.sessionToken && (
          <Menu
            sessionToken={this.state.sessionToken}
            clearToken={this.clearToken}
            isAdmin={this.state.isAdmin}
          />
        )}
        <div>
          <Switch>
            <Route exact path='/'>
              {this.protectedViews()}
            </Route>
            <Route exact path='/home'>
            <Home sessionToken={this.state.sessionToken} />
            </Route>
            <Route exact path='/movies'>
              <MovieIndex sessionToken={this.state.sessionToken} />
            </Route>
            <Route exact path='/reviews'>
              <ReviewIndex sessionToken={this.state.sessionToken} />
            </Route>
            {/* This restricts a user from typing /admin  */}
            {this.state.isAdmin === "true"
              ? (
                <Route exact path='/admin'>
                  <Admin sessionToken={this.state.sessionToken} />
                </Route>)
              : (<Redirect to="/" />)

            }
         {/* <Route exact path='/admin'>
           <Admin sessionToken={this.state.sessionToken} />
         </Route> */}

          </Switch>
        </div>
      </GlobalStyle>
    )
  }
}

export default App;
