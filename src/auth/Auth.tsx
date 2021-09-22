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
            showLogin: false
        }
        this.render = this.render.bind(this)
    }


    loginToggle = (e: any) => {
        e.preventDefault();
        if (this.state.showLogin === false) {
            return this.setState({
                showLogin: true
            });
        }
        console.log(this.state.showLogin)
    }
    render() {
        return(
            
            <div>
            {
            this.state.showLogin 
            ? <Signup updateToken={this.props.updateToken}/>
            : 
            <Login updateToken={this.props.updateToken}/>
            }
            <br />
            <button onClick={(e) => {this.loginToggle(e);}}>
                {this.state.showLogin ? "Login" : "Sign Up"}
            </button>

        </div>    
        )
    }
    
}

//     <div>
        //     {
        //     this.state.showLogin 
        //     ? 
        //     (<div><Signup updateToken={this.props.updateToken}/></div>)
        //     : 
        //     (<div><Login updateToken={this.props.updateToken}/></div>)
        //     }
        //     <br />
        //     <button onClick={(e) => {this.loginToggle(e);}}>
        //         {this.state.showLogin ? "Login" : "Sign Up"}
        //     </button>

        // </div> 