import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import {Signup} from './auth'
// import logo from './logo.svg';
import './App.css';

import {Header} from './common';


class App extends Component {
  render () {
    return(
      <div className="App">
        <Header brand="Izutu"/>
        <Signup />
        

      </div>
    )
  }
}

export default App;
