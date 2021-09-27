import React from 'react';
import Signup from './SignupForm';
import Login from './LoginForm';

type AuthProps = {
    updateToken: (newToken: string) => void,
    updateAdmin: (newAdmin: string) => void
}

type AuthState = {
    showLogin: boolean
}

export default class Auth extends React.Component<AuthProps, AuthState>{
    constructor(props: AuthProps) {
        super(props);
        this.state ={
            showLogin: false
        }
        this.render = this.render.bind(this)
    }

    render() {
        return(
            
            <div className="auth-inner">
            {
            this.state.showLogin 
            ? <Signup updateToken={this.props.updateToken}/>
            : 
            <Login 
            updateToken={this.props.updateToken}
            updateAdmin={this.props.updateAdmin}
            />
            }
            <br />
            <button onClick={() => this.setState({showLogin: !this.state.showLogin})}>
                {this.state.showLogin ? "Login" : "Sign Up"}
            </button>

        </div>    
        )
    }
    
}
