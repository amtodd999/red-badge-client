import React from 'react';
import Signup from './SignupForm';
import Login from './LoginForm';

type AuthProps = {
    updateToken: (newToken: string) => void
}

type AuthState = {
    showLogin: boolean
}

export default class Auth extends React.Component<AuthProps, AuthState>{
    constructor(props: AuthProps) {
        super(props);
        this.state ={
            showLogin: true
        }
        this.render = this.render.bind(this)
    }
    render() {
        return(
            this.state.showLogin ? <Login updateToken={this.updateToken}/> : 
            <Signup updateToken={this.updateToken}/>
            
        )
    }
    
}