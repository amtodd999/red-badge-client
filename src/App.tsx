import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Signup from './components/SignupForm';

import {Header} from './common';

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

  componentDidMount(){
    if (localStorage.getItem('token')) {
      this.setState({
        token: localStorage.getItem('token')!,
      })
    }
    console.log(this.state.token)
  }

  updateToken = (newToken: string): void => {
    localStorage.setItem('token', newToken)
    this.setState({token: newToken})
    console.log(this.state.token + " updated token")
  }

  clearToken = () => {
    localStorage.clear()
    this.setState({ token: ''})
  }

  protectedViews = () => {
    return this.state.token === localStorage.getItem('token') ? 
      (<div>put movie stuff here</div>) :
      (<div>put account page here</div>)
    
  }


  render () {
    return(
      <div className="App">
        <Header brand="Izutu"/>
        <Signup updateToken={this.updateToken} />

      </div>
    )
  }
}

export default App;
